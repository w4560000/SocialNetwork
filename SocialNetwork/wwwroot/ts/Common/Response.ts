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
    Brithday: Date;
    Interest: string;
    Job: string;
    Education: string;
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
}