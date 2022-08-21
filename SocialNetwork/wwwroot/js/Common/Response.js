/**
 * 取得會員資訊 Response ViewModel
 * */
var GetMemberInfoResViewModel = /** @class */ (function () {
    function GetMemberInfoResViewModel(memberID, nickName, profilePhotoURL, backgroundPhotoURL, brithday, interest, job, education, infoStatus, isOriginalMember) {
        this.MemberID = memberID;
        this.NickName = nickName;
        this.ProfilePhotoURL = profilePhotoURL;
        this.BackgroundPhotoURL = backgroundPhotoURL;
        this.Brithday = brithday;
        this.Interest = interest;
        this.Job = job;
        this.Education = education;
        this.InfoStatus = infoStatus;
        this.IsOriginalMember = isOriginalMember;
    }
    return GetMemberInfoResViewModel;
}());
