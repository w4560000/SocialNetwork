const Friend = {

    /**
     * 發送好友邀請
     */
    SendFriendInvitation: (memberID: number, nickName: string, successFunc: Function) => {
        let model = new CommonMemberViewModel(memberID);

        SendFriendInvitationAPI(model, successFunc, `確定是否對 ${nickName} \n發送好友邀請?`);
    },

    /**
     * 判斷好友邀請 (接受 or 拒絕)
     */
    DecideFriendInvitation: (memberID: number, nickName: string, decide: DecideFriendInvitationEnum, successFunc: Function) => {
        let model = new DecideFriendInvitationReqViewModel(memberID, decide);

        DecideFriendInvitationAPI(model, successFunc, `確定是否${DecideFriendInvitationEnum[decide]} ${nickName} \n的好友邀請?`);
    },

    /**
     * 收回好友邀請
     */
    RevokeFriendInvitation: (memberID: number, nickName: string, successFunc: Function) => {
        let model = new CommonMemberViewModel(memberID);

        RevokeFriendInvitationAPI(model, successFunc, `確定是否收回 ${nickName} \n的好友邀請?`);
    },

    /**
     * 刪除好友
     */
    DeleteFriend: (memberID: number, nickName: string, successFunc: Function) => {
        let model = new CommonMemberViewModel(memberID);

        DeleteFriendAPI(model, successFunc, `確定是否刪除與 ${nickName} \n的好友關係?`);
    },
};