/**
 * 共用回應 ViewModel
 * */
class ResponseViewModel<T>
{
    Status: ResponseStatusEnum | undefined;
    Message: string | undefined;
    Data: T | undefined;

    constructor(msg: string) {
        this.Message = msg;
    }
}

/**
 * Google 第三方登入 Response ViewModel
 * */
class GoogleLoginResViewModel {
    IsFirstLogin: boolean;
}

/**
 * 取得會員資訊 Response ViewModel
 * */
class GetMemberInfoResViewModel {
    MemberID: number;
    NickName: string;
    ProfilePhotoURL: string;
    BackgroundPhotoURL: string;
    Brithday: Date | null;
    Interest: string;
    Job: string;
    Education: MemberEducationEnum;
    InfoStatus: MemberPublicInfoEnum;
    IsOriginalMember: boolean;
}

/**
 * 取得好友清單 Response ViewModel
 * 取得好友邀請清單 Response ViewModel
 * 取得您送出的好友邀請清單 Response ViewModel
 * */
class GetFriendListResViewModel {
    MemberID: number;
    NickName: string;
    ProfilePhotoURL: string;
    Status: MemberStatusEnum;
}

/**
 * 取得好友狀態 Response ViewModel
 * */
class GetFriendStatusResViewModel {
    FriendStatus: FriendStatusEnum;
}

/** 
 * 取得貼文 Response ViewModel 
 * 取得會員貼文 Response ViewModel 
 * */
class GetPostResViewModel {
    MemberID: number;
    NickName: string;
    ProfilePhotoUrl: string;
    PostKey: number;
    PostDateTime: Date;
    PostContent: string;
    PostImageUrlList: Array<string>;
    PostLike: number;
    IsCurrnetMemberPostLiked: boolean;
    TotalPostMsgCount: number;
    PostMsgList: Array<GetPostMsgResViewModel>;
}

/**
 * 貼文留言 Response ViewModel
 * */
class GetPostMsgResViewModel {
    PostKey: number;
    MsgKey: number;
    MemberID: number;
    NickName: string;
    ProfilePhotoUrl: string;
    MsgContent: string;
    PostMsgDateTime: Date;
}