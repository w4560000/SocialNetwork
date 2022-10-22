import { API, Enum, Request } from "../Common/CommonInferface.js";
export var Friend = {
    /**
     * 發送好友邀請
     */
    SendFriendInvitation: function (memberID, nickName, successFunc) {
        var model = new Request.CommonMemberViewModel(memberID);
        API.SendFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u5C0D ".concat(nickName, " \n\u767C\u9001\u597D\u53CB\u9080\u8ACB?"));
    },
    /**
     * 判斷好友邀請 (接受 or 拒絕)
     */
    DecideFriendInvitation: function (memberID, nickName, decide, successFunc) {
        var model = new Request.DecideFriendInvitationReqViewModel(memberID, decide);
        API.DecideFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426".concat(Enum.DecideFriendInvitationEnum[decide], " ").concat(nickName, " \n\u7684\u597D\u53CB\u9080\u8ACB?"));
    },
    /**
     * 收回好友邀請
     */
    RevokeFriendInvitation: function (memberID, nickName, successFunc) {
        var model = new Request.CommonMemberViewModel(memberID);
        API.RevokeFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u6536\u56DE ".concat(nickName, " \n\u7684\u597D\u53CB\u9080\u8ACB?"));
    },
    /**
     * 刪除好友
     */
    DeleteFriend: function (memberID, nickName, successFunc) {
        var model = new Request.CommonMemberViewModel(memberID);
        API.DeleteFriendAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u522A\u9664\u8207 ".concat(nickName, " \n\u7684\u597D\u53CB\u95DC\u4FC2?"));
    },
};
