import { API, Enum, Request, Response, Common } from "../Common/Index.js";

export const Friend = {

    /**
     * 發送好友邀請
     */
    SendFriendInvitation: (memberID: number, nickName: string, successFunc: Function) => {
        let model = new Request.CommonMemberViewModel(memberID);

        API.SendFriendInvitationAPI(model, successFunc, `確定是否對 ${nickName} \n發送好友邀請?`);
    },

    /**
     * 判斷好友邀請 (接受 or 拒絕)
     */
    DecideFriendInvitation: (memberID: number, nickName: string, decide: Enum.DecideFriendInvitationEnum, successFunc: Function) => {
        let model = new Request.DecideFriendInvitationReqViewModel(memberID, decide);

        API.DecideFriendInvitationAPI(model, successFunc, `確定是否${Enum.DecideFriendInvitationEnum[decide]} ${nickName} \n的好友邀請?`);
    },

    /**
     * 收回好友邀請
     */
    RevokeFriendInvitation: (memberID: number, nickName: string, successFunc: Function) => {
        let model = new Request.CommonMemberViewModel(memberID);

        API.RevokeFriendInvitationAPI(model, successFunc, `確定是否收回 ${nickName} \n的好友邀請?`);
    },

    /**
     * 刪除好友
     */
    DeleteFriend: (memberID: number, nickName: string, successFunc: Function) => {
        let model = new Request.CommonMemberViewModel(memberID);

        API.DeleteFriendAPI(model, successFunc, `確定是否刪除與 ${nickName} \n的好友關係?`);
    },
};