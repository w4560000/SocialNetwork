var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.Init = function (user) {
        this.MemberID = user.MemberID;
        this.Account = user.Account;
        this.NickName = user.NickName;
        this.ProfilePhotoUrl = user.ProfilePhotoUrl;
        this.Status = user.Status;
        var oAuthList = ["google"];
        this.IsOriginalMember = oAuthList.every(function (a) { return a != user.Account.split('@').pop(); });
        return this;
    };
    return User;
}());
export { User };
