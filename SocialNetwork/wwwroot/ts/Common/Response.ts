import { API, Enum, Request, Common } from "../Common/Index.js";

/**
 * 共用回應 ViewModel
 * */
export class ResponseViewModel<T>
{
    Status: Enum.ResponseStatusEnum | undefined;
    Message: string | undefined;
    Data: T | undefined;

    constructor(msg: string) {
        this.Message = msg;
    }
}

/**
 * Google 第三方登入 Response ViewModel
 * */
export class GoogleLoginResViewModel {
    IsFirstLogin: boolean;
}

/**
 * 取得會員資訊 Response ViewModel
 * */
export class GetMemberInfoResViewModel {
    MemberID: number;
    NickName: string;
    ProfilePhotoURL: string;
    BackgroundPhotoURL: string;
    Brithday: Date;
    Interest: string;
    Job: string;
    Education: string;
    InfoStatus: Enum.MemberPublicInfoEnum;
    IsOriginalMember: boolean;
}

/**
 * 取得好友清單 Response ViewModel
 * 取得好友邀請清單 Response ViewModel
 * 取得您送出的好友邀請清單 Response ViewModel
 * */
export class GetFriendListResViewModel {
    MemberID: number;
    NickName: string;
    ProfilePhotoURL: string;
    Status: Enum.MemberStatusEnum;
}

/**
 * 取得好友狀態 Response ViewModel
 * */
export class GetFriendStatusResViewModel {
    FriendStatus: Enum.FriendStatusEnum;
}