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
        /// <param name="model">發佈貼文 Request ViewModel</param>
        /// <returns>發佈結果</returns>
        public async Task<ResponseViewModel> PublishPostAsync(PublishPostReqViewModel model)
        {
            List<Task<string>> photoFileTask = model.PhotoFiles.Select(async s =>
            {
                var photoFile = new PhotoFileDto()
                {
                    FileName = $"{this.UserContext.User.MemberID}/{Guid.NewGuid()}",
                    FileExtension = Path.GetExtension(s.FileName),
                    FileByte = await s.GetBytes()
                };

                // 上傳 Azure Blob
                await AzureHelper.UpLoadImageAsync(AzureBlobDirectoryEnum.PostPhoto, photoFile);

                return AzureHelper.GetImage(AzureBlobDirectoryEnum.PostPhoto, photoFile);
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

        /// <summary>
        /// 取得會員貼文
        /// </summary>
        /// <param name="model">取得會員貼文 Request ViewModel</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel<List<GetPostResViewModel>>> GetMemberPost(CommonMemberViewModel model)
        {

            string getPostSql = @"
SELECT a.MemberID, b.NickName, b.ProfilePhotoURL, a.PostKey, a.CreatedAt AS 'PostDateTime', a.PostContent, a.PostImageUrl AS 'PostImageUrlStr', a.GoodQuantity
FROM [SocialNetwork].[dbo].[Post] a
INNER JOIN [SocialNetwork].[dbo].[Member] b
ON a.MemberID = b.MemberID
WHERE a.MemberID = @MemberID";

            string getPostMsgSql = @"
SELECT a.PostKey, a.MemberID, b.NickName, b.ProfilePhotoURL, a.MsgContent, a.CreatedAt AS 'PostMsgDateTime',
ROW_NUMBER() OVER( PARTITION BY PostKey ORDER BY a.CreatedAt ASC) as rowNumber
INTO #TempPostData
FROM [SocialNetwork].[dbo].[PostMsg] a
INNER JOIN [SocialNetwork].[dbo].[Member] b
ON a.MemberID = b.MemberID
WHERE PostKey IN @PostKeyList
ORDER BY PostKey, PostMsgDateTime ASC

SELECT DISTINCT a.PostKey, Count(1) 'TotalPostMsgCount'
INTO #TempPostMsgCount
FROM #TempPostData a
INNER JOIN [SocialNetwork].[dbo].[PostMsg] b
on a.PostKey = b.PostKey
GROUP BY a.PostKey, b.MsgKey

-- 取前三筆留言
SELECT a.PostKey, a.MemberID, a.NickName, a.ProfilePhotoURL, a.MsgContent, a.PostMsgDateTime, b.TotalPostMsgCount
FROM #TempPostData a
INNER JOIN #TempPostMsgCount b
ON a.PostKey = b.PostKey
WHERE rowNumber IN (1,2,3)";

            // 貼文清單
            var postList = (await this.PostRepository.QueryAsync<GetPostResViewModel>(getPostSql, new { model.MemberID })).ToList();

            // 貼文留言清單
            var postMsgList = (await this.PostRepository.QueryAsync<GetPostMsgResViewModel>(getPostMsgSql, new { PostKeyList = postList.Select(s => s.PostKey) })).ToList();

            // mapping 貼文留言清單
            postList.ForEach(f => f.PostMsgList = postMsgList.Where(w => w.PostKey == f.PostKey).OrderBy(o => o.PostMsgDateTime).ToList());

            
            return "取得會員貼文成功".AsSuccessResponse(postList);
        }
    }
}