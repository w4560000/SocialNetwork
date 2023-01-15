/**
 * 通用的 Member ViewModel
 * */
class CommonMemberViewModel {
    MemberID: number;

    constructor(memberID: number) {
        this.MemberID = memberID
    }
}

/**
 * 通用的 Post ViewModel
 * */
class CommonPostViewModel {
    PostKey: number;

    constructor(postKey: number) {
        this.PostKey = postKey
    }
}

/**
 * 查詢資料筆數 Member ViewModel
 * */
class QueryRowMemberReqViewModel {
    MemberID: number;
    QueryRowNo: number;

    constructor(memberID: number, queryRowNo: number) {
        this.MemberID = memberID;
        this.QueryRowNo = queryRowNo;
    }
}

/**
 * 登入 Request ViewModel
 * */
class LoginReqViewModel {
    Account: string;
    Password: string;

    constructor(account: string, password: string) {
        this.Account = account;
        this.Password = password;
    }
}

/**
 * Google 第三方登入 Request ViewModel
 * */
class GoogleLoginReqViewModel {
    Code: string;

    constructor(code: string) {
        this.Code = code;
    }
}

/**
 * 寄送驗證碼 Request ViewModel
 * */
class SendVCodeReqViewModel {
    Mail: string;

    constructor(mail: string) {
        this.Mail = mail;
    }
}

/**
 * 註冊 Request ViewModel
 * */
class SignupReqViewModel {
    NickName: string;
    Account: string;
    Password: string;
    PasswordCheck: string;
    Mail: string;
    VCode: string;

    constructor(nickName: string, account: string, password: string, passwordCheck: string, mail: string, vCode: string) {
        this.NickName = nickName;
        this.Account = account;
        this.Password = password;
        this.PasswordCheck = passwordCheck;
        this.Mail = mail;
        this.VCode = vCode;
    }
}

/**
 * 更新會員公開資訊 Request ViewModel
 * */
class UpdateMemberPublicInfoReqViewModel {
    Brithday: Date;
    Interest: string;
    Job: string;
    Education: MemberEducationEnum;
    InfoStatus: MemberPublicInfoEnum;

    constructor(brithday: Date, interest: string, job: string, education: MemberEducationEnum, infoStatus: MemberPublicInfoEnum) {
        this.Brithday = brithday;
        this.Interest = interest;
        this.Job = job;
        this.Education = education;
        this.InfoStatus = infoStatus;
    }
}

/**
 * 重設密碼 Step1 Request ViewModel
 * */
class ResetPasswordReqViewModel {
    Account: string;
    Mail: string;

    constructor(account: string, mail: string) {
        this.Account = account;
        this.Mail = mail;
    }
}

/**
 * 重設密碼 Step2 Request ViewModel
 * */
class ResetPasswordConfirmReqViewModel {
    Password: string;
    PasswordCheck: string;
    Guid: string;

    constructor(password: string, passwordCheck: string, guid: string) {
        this.Password = password;
        this.PasswordCheck = passwordCheck;
        this.Guid = guid;
    }
}

/**
 * 更新會員狀態 Request ViewModel
 * */
class UpdateMemberStatusReqViewModel {
    Status: MemberStatusEnum;

    constructor(status: MemberStatusEnum) {
        this.Status = status;
    }
}

/**
 * 密碼變更 Request ViewModel
 * */
class ChangePasswordReqViewModel {
    OldPassword: string;
    NewPassword: string;
    NewPasswordCheck: string;

    constructor(
        oldPassword: string,
        newPassword: string,
        newPasswordCheck: string) {
        this.OldPassword = oldPassword;
        this.NewPassword = newPassword;
        this.NewPasswordCheck = newPasswordCheck;
    }
}

/**
 * 判斷好友邀請 Request ViewModel
 * */
class DecideFriendInvitationReqViewModel {
    MemberID: number;
    Decision: DecideFriendInvitationEnum;

    constructor(
        memberID: number,
        decision: DecideFriendInvitationEnum) {
        this.MemberID = memberID;
        this.Decision = decision;
    }
}