/**
 * 共用回應 ViewModel
 * */
class ResponseViewModel<T>
{
    Status: ResponseStatusEnum | undefined;
    Message: string | undefined;
    Data: T | undefined;
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
    Education: string;
    InfoStatus: MemberPublicInfoEnum;

    constructor(brithday: Date, interest: string, job: string, education: string, infoStatus: MemberPublicInfoEnum) {
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