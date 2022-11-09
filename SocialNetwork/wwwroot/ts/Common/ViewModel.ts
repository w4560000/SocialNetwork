class User {
    MemberID: number;
    Account: string;
    NickName: string;
    ProfilePhotoUrl: string;
    Status: MemberStatusEnum;
    IsOriginalMember: boolean;

    public Init(user: User): User {
        this.MemberID = user.MemberID;
        this.Account = user.Account;
        this.NickName = user.NickName;
        this.ProfilePhotoUrl = user.ProfilePhotoUrl;
        this.Status = user.Status;

        let oAuthList = ["google"];
        this.IsOriginalMember = oAuthList.every(a => a != user.Account.split('@').pop());

        return this;
    }
}