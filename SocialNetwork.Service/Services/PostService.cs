using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork.Service
{
    /// <summary>
    /// PostService
    /// </summary>
    public class PostService : IPostService
    {
        /// <summary>
        /// IPostRepository
        /// </summary>
        private readonly IPostRepository PostRepository;

        /// <summary>
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="postRepository">IPostRepository</param>
        /// <param name="userContext">IUserContext</param>
        public PostService(
            IPostRepository postRepository,
            IUserContext userContext)
        {
            this.PostRepository = postRepository;
            this.UserContext = userContext;
        }

        /// <summary>
        /// 發佈貼文
        /// </summary>
        /// <param name="model">發佈貼文 Req Model</param>
        /// <returns>發佈結果</returns>
        public async Task<ResponseViewModel> PublishPost(PublishPostReqViewModel model)
        {
            List<Task<string>> photoFileTask = model.PhotoFiles.Select(async s =>
            {
                var photoFile = new PhotoFileDto()
                {
                    FileFullName = $"{this.UserContext.User.MemberID}/{Guid.NewGuid()}{Path.GetExtension(s.FileName)}",
                    FileByte = await s.GetBytes()
                };

                // 上傳 Azure Blob
                await AzureHelper.UpLoadImageAsync(AzureBlobDirectoryEnum.PostPhoto, photoFile);

                return AzureHelper.GetImage(AzureBlobDirectoryEnum.PostPhoto, photoFile.FileFullName);
            }).ToList();

            var PhotoFileUrls = string.Join(",", await Task.WhenAll(photoFileTask));

            Post postEntity = new Post()
            {
                MemberID = this.UserContext.User.MemberID,
                PostContent = model.Post,
                PostImageUrl = PhotoFileUrls,
                Status = PostStatusEnum.Publish
            };

            this.PostRepository.Add<int>(postEntity);

            return "發佈貼文成功".AsSuccessResponse();
        }
    }
}