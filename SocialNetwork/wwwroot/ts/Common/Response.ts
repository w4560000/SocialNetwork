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

    constructor(
        memberID: number,
        nickName: string,
        profilePhotoURL: string,
        backgroundPhotoURL: string,
        brithday: Date,
        interest: string,
        job: string,
        education: string,
        infoStatus: MemberPublicInfoEnum,
        isOriginalMember: boolean) {
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
}