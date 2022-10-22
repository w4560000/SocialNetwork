import { API, Request, Response, Common } from "../Common/CommonInferface.js";

/**
 * 共用 API 回應狀態 列舉 
 * */
export enum ResponseStatusEnum {
    Error = 0,
    Success = 1
}

/**
 * 會員公開資訊 列舉
 * */
export enum MemberPublicInfoEnum {
    全部不公開 = 0,
    公開生日 = 1,
    公開興趣 = 2,
    公開工作 = 4,
    公開學歷 = 8,
    全部公開 = 公開生日 | 公開興趣 | 公開工作 | 公開學歷
}

/**
 * 會員狀態 列舉
 * */
export enum MemberStatusEnum {
    在線 = 1,
    忙碌 = 2,
    離線 = 3
}

/**
 * 判斷好友邀請 列舉
 * */
export enum DecideFriendInvitationEnum {
    拒絕 = 0,
    接受 = 1
}

/**
 * 好友狀態 列舉
 * */
export enum FriendStatusEnum {
    非好友 = 0,
    已寄送好友邀請 = 1,
    已接收好友邀請 = 2,
    為好友 = 3
}