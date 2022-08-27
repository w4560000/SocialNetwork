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