using SocialNetwork.Helper;
using SocialNetwork.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

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
        /// IPostMsgRepository
        /// </summary>
        private readonly IPostMsgRepository PostMsgRepository;

        /// <summary>
        /// IMemberRepository
        /// </summary>
        private readonly IMemberRepository MemberRepository;

        /// <summary>
        /// IUserContext
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// IFriendService
        /// </summary>
        private readonly IFriendService FriendService;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="postRepository">IPostRepository</param>
        /// <param name="postMsgRepository">IPostMsgRepository</param>
        /// <param name="memberRepository">IMemberRepository</param>
        /// <param name="friendService">IFriendService
        /// </param>
        /// <param name="userContext">IUserContext</param>
        public PostService(
            IPostRepository postRepository,
            IPostMsgRepository postMsgRepository,
            IMemberRepository memberRepository,
            IFriendService friendService,
            IUserContext userContext)
        {
            this.PostRepository = postRepository;
            this.PostMsgRepository = postMsgRepository;
            this.MemberRepository = memberRepository;
            this.FriendService = friendService;
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
            };

            this.PostRepository.Add<int>(postEntity);

            return "發佈貼文成功".AsSuccessResponse();
        }

        /// <summary>
        /// 取得首頁貼文 (自己和朋友)
        /// </summary>
        /// <param name="model">取得貼文 (自己和朋友) Request ViewModel</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel<List<GetPostResViewModel>>> GetIndexPost(QueryRowMemberReqViewModel model)
        {
            model.MemberID = this.UserContext.User.MemberID;

            if (!this.MemberRepository.TryGetEntity(model.MemberID, out _))
                return CommonExtension.AsSystemFailResponse<List<GetPostResViewModel>>();

            var friendList = await this.FriendService.GetFriendListAsync(model.MemberID);
            var friendMemberIDList = friendList.Data.Select(s => s.MemberID).ToList();
            var queryMemberIDList = new List<int>() { this.UserContext.User.MemberID }.Concat(friendMemberIDList);
            var postData = await this.QueryPost(queryMemberIDList.ToList(), model.QueryRowNo);

            return "取得貼文成功".AsSuccessResponse(postData);
        }

        /// <summary>
        /// 取得會員個人貼文
        /// </summary>
        /// <param name="model">取得會員貼文 Request ViewModel</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel<List<GetPostResViewModel>>> GetHomePagePost(QueryRowMemberReqViewModel model)
        {
            var postData = await this.QueryPost(new List<int>() { model.MemberID }, model.QueryRowNo);

            return "取得會員貼文成功".AsSuccessResponse(postData);
        }

        /// <summary>
        /// 取得該貼文所有留言
        /// </summary>
        /// <param name="model">取得該貼文所有留言 Request ViewModel</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel<List<GetPostMsgResViewModel>>> GetPostAllMsg(CommonPostViewModel model)
        {
            string sql = @"
SELECT a.PostKey, a.MsgKey, a.MemberID, b.NickName, b.ProfilePhotoURL, a.MsgContent, a.CreatedAt AS 'PostMsgDateTime'
FROM [SocialNetwork].[dbo].[PostMsg] a
INNER JOIN [SocialNetwork].[dbo].[Member] b
ON a.MemberID = b.MemberID
WHERE a.PostKey = @PostKey
ORDER BY PostMsgDateTime ASC";

            // 貼文留言清單
            List<GetPostMsgResViewModel> postMsgList = (await this.PostRepository.QueryAsync<GetPostMsgResViewModel>(sql, new { model.PostKey })).ToList();

            return "取得該貼文所有留言成功".AsSuccessResponse(postMsgList);
        }

        /// <summary>
        /// 貼文按讚 or 取消按讚
        /// </summary>
        /// <param name="model">取得該貼文所有留言 Request ViewModel</param>
        /// <returns>取得結果</returns>
        public async Task<ResponseViewModel> TogglePostLike(TogglePostLikeViewModel model)
        {
            if (!this.PostRepository.TryGetEntity(model.PostKey, out _))
                return CommonExtension.AsSystemFailResponse();

            string sql = @$"
MERGE INTO [dbo].[PostLike] a
USING (
		SELECT @PostKey AS 'PostKey', @MemberID AS 'MemberID', @Toggle AS 'Toggle'
	  ) data ON a.PostKey = data.PostKey AND a.MemberID = data.MemberID
WHEN MATCHED AND Toggle = {(int)ToggleEnum.Off} THEN
	DELETE
WHEN NOT MATCHED AND data.Toggle = {(int)ToggleEnum.On} THEN
	INSERT VALUES (data.PostKey, data.MemberID, GETDATE(), data.MemberID, GETDATE(), data.MemberID);";

            await this.PostMsgRepository.QueryAsync<int>(sql, new { model.PostKey, model.Toggle, this.UserContext.User.MemberID });

            return "操作成功".AsSuccessResponse();
        }

        /// <summary>
        /// 發送貼文留言
        /// </summary>
        /// <param name="model">發送貼文留言 Request ViewModel</param>
        /// <returns>發送結果</returns>
        public async Task<ResponseViewModel<GetPostMsgResViewModel>> SendPostMsg(SendPostMsgReqViewModel model)
        {
            if (!this.PostRepository.TryGetEntity(model.PostKey, out _))
                return CommonExtension.AsSystemFailResponse<GetPostMsgResViewModel>();

            PostMsg postMsgEntity = new PostMsg()
            {
                PostKey = model.PostKey,
                MemberID = this.UserContext.User.MemberID,
                MsgContent = model.Msg
            };

            var postMsgKey = await this.PostMsgRepository.AddAsync<int>(postMsgEntity);

            if (postMsgKey == 0)
                return CommonExtension.AsSystemFailResponse<GetPostMsgResViewModel>();

            var postMsg = await this.GetPostMsgAsync(postMsgKey);

            return "發送成功".AsSuccessResponse(postMsg);
        }

        /// <summary>
        /// 刪除貼文
        /// </summary>
        /// <param name="model">刪除貼文 Request ViewModel</param>
        /// <returns>刪除結果</returns>
        public async Task<ResponseViewModel> DeletePostAsync(CommonPostViewModel model)
        {
            if (!this.PostRepository.TryGetEntity(model.PostKey, out Post post))
                return CommonExtension.AsSystemFailResponse();

            // 無法刪除他人貼文
            if (post.MemberID != this.UserContext.User.MemberID)
                return CommonExtension.AsSystemFailResponse();

            var directory = AzureBlobDirectoryEnum.PostPhoto.ToString();
            var postImageUrlList = new List<string>();

            if (!post.PostImageUrl.IsNullOrEmpty())
            {
                postImageUrlList = post.PostImageUrl.Split(',').Select(s =>
                    s.Substring(s.LastIndexOf(directory) + directory.Length, s.Length - (s.LastIndexOf(directory) + directory.Length)).Trim('/')).ToList();
            }

            await this.PostRepository.DeleteListAsync("WHERE PostKey = @PostKey", new { model.PostKey });
            var deletePostMsgTask = this.PostMsgRepository.DeleteListAsync("WHERE PostKey = @PostKey", new { model.PostKey });
            var deketePostImgTask = AzureHelper.DeleteImageAsync(AzureBlobDirectoryEnum.PostPhoto, postImageUrlList);
            await Task.WhenAll(deletePostMsgTask, deketePostImgTask);

            return "刪除成功".AsSuccessResponse();
        }

        /// <summary>
        /// 查詢貼文
        /// </summary>
        /// <param name="memberIDList">查詢貼文的MemberID</param>
        /// <param name="queryRowNo">查詢起始行數</param>
        private async Task<List<GetPostResViewModel>> QueryPost(List<int> memberIDList, int queryRowNo)
        {
            string sql = @"
;WITH PostData AS
(
	SELECT p.MemberID, m.NickName, m.ProfilePhotoURL, p.PostKey, p.CreatedAt AS 'PostDateTime', p.PostContent, p.PostImageUrl AS 'PostImageUrlStr',
           ISNULL(glCount.PostLike, 0 ) AS 'PostLike',
           ISNULL(pl.MemberID, 0) AS 'IsCurrnetMemberPostLiked'
	FROM [SocialNetwork].[dbo].[Post] p
	INNER JOIN [SocialNetwork].[dbo].[Member] m
		ON p.MemberID = m.MemberID
    LEFT JOIN
        (SELECT PostKey, count(1) AS 'PostLike'
         FROM dbo.PostLike
         GROUP BY PostKey) as glCount
        ON p.PostKey = glCount.PostKey
	LEFT JOIN dbo.PostLike pl
        ON pl.PostKey = p.PostKey AND pl.MemberID = @CurrentMemberID
    WHERE p.MemberID IN @MemberIDList
),
TotalPostMsgCount AS
(
	SELECT pd.PostKey, Count(1) AS 'TotalPostMsgCount'
	FROM [SocialNetwork].[dbo].[PostMsg] pm
	INNER JOIN PostData pd
		ON pm.PostKey = pd.PostKey
	GROUP BY pd.PostKey
)
SELECT
    pd.*,
    ISNULL(tpmc.TotalPostMsgCount, 0) AS 'TotalPostMsgCount',
    ROW_NUMBER() OVER (ORDER BY pd.PostDateTime DESC) AS RowNo
INTO #ResultData
FROM PostData pd
LEFT JOIN TotalPostMsgCount tpmc
ON pd.PostKey = tpmc.PostKey;

SELECT *
INTO #TempPostData
FROM #ResultData
WHERE RowNo BETWEEN @QueryRowNo AND @QueryRowNo + 2
ORDER BY RowNo

SELECT * FROM #TempPostData;

SELECT a.PostKey, a.MsgKey, a.MemberID, b.NickName, b.ProfilePhotoURL, a.MsgContent, a.CreatedAt AS 'PostMsgDateTime',
ROW_NUMBER() OVER( PARTITION BY PostKey ORDER BY a.CreatedAt ASC) as rowNumber
INTO #TempPostMsgData
FROM [SocialNetwork].[dbo].[PostMsg] a
INNER JOIN [SocialNetwork].[dbo].[Member] b
ON a.MemberID = b.MemberID
WHERE a.PostKey IN (SELECT PostKey FROM #TempPostData)
ORDER BY a.PostKey, PostMsgDateTime ASC

-- 取前三筆留言
SELECT *
FROM #TempPostMsgData
WHERE rowNumber IN (1,2,3)";

            GridReader postData = await this.PostRepository.QueryMultipleAsync(sql, new { MemberIDList = memberIDList, QueryRowNo = queryRowNo, CurrentMemberID = this.UserContext.User.MemberID });

            // 貼文清單
            List<GetPostResViewModel> postList = (await postData.ReadAsync<GetPostResViewModel>()).ToList();

            // 貼文留言清單
            List<GetPostMsgResViewModel> postMsgList = (await postData.ReadAsync<GetPostMsgResViewModel>()).ToList();

            // mapping 貼文留言清單
            postList.ForEach(f =>
            {
                f.PostMsgList = postMsgList.Where(w => w.PostKey == f.PostKey).OrderBy(o => o.PostMsgDateTime).ToList();
            });

            return postList;
        }

        /// <summary>
        /// 查詢貼文留言
        /// </summary>
        /// <param name="postMsgKey">貼文留言編號</param>
        private async Task<GetPostMsgResViewModel> GetPostMsgAsync(int postMsgKey)
        {
            string sql = @"
SELECT a.PostKey, a.MsgKey, a.MemberID, b.NickName, b.ProfilePhotoURL, a.MsgContent, a.CreatedAt AS 'PostMsgDateTime'
FROM [SocialNetwork].[dbo].[PostMsg] a
INNER JOIN [SocialNetwork].[dbo].[Member] b
ON a.MemberID = b.MemberID
WHERE a.MsgKey = @postMsgKey";

            // 貼文留言
            GetPostMsgResViewModel postMsgList = (await this.PostMsgRepository.QueryAsync<GetPostMsgResViewModel>(sql, new { postMsgKey })).FirstOrDefault();

            return postMsgList;
        }
    }
}