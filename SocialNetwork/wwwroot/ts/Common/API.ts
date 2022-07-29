
function BaseAPI<T>(loadingMsg: string, api: string, model: T, successFunc?: Function, errorFunc?: Function) {
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);
    
    $.ajax({
        method: "POST",
        url: api,
        data: JSON.stringify(model),
        dataType: "json",
        contentType: "application/json",
        success: (res: ResponseViewModel<object>) => {
            if (res.Status == ResponseStatusEnum.Success) {
                    Common.SweetAlertSuccess(res.Message, successFunc);
            }
            else {
                Common.SweetAlertError(res.Message, errorFunc);
            }
        },
        error: (e) => {
            Common.SweetAlertError("伺服器異常", errorFunc);
        }
    });
}


function LoginAPI(loadingMsg: string, model: LoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    BaseAPI<LoginReqViewModel>(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}
    
function SendVCodeAPI(loadingMsg: string, model: SendVCodeReqViewModel, successFunc: Function, errorFunc: Function): void {
    BaseAPI<SendVCodeReqViewModel>(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}

function SignupAPI(loadingMsg: string, model: SignupReqViewModel, successFunc: Function, errorFunc: Function): void {
    BaseAPI<SignupReqViewModel>(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}

function UpdateMemberPublicInfoAPI(loadingMsg: string, model: UpdateMemberPublicInfoReqViewModel, successFunc: Function, errorFunc: Function): void {
    BaseAPI<UpdateMemberPublicInfoReqViewModel>(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc);
}

function ResetPasswordAPI(loadingMsg: string, model: ResetPasswordReqViewModel, successFunc: Function, errorFunc: Function): void {
    BaseAPI<ResetPasswordReqViewModel>(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc);
}

/// <summary>
/// 共用回應 ViewModel
/// </summary>
/// <typeparam name="T"></typeparam>
class ResponseViewModel<T>
{
    /// <summary>
    /// 回應狀態
    /// </summary>
    Status: ResponseStatusEnum | undefined;

    /// <summary>
    /// 回應訊息
    /// </summary>
    Message: string | undefined;

    /// <summary>
    /// 回應資料
    /// </summary>
    Data: T | undefined;
}

class LoginReqViewModel {
    Account: string;
    Password: string;

    constructor(account: string, password: string) {
        this.Account = account;
        this.Password = password;
    }
}

class SendVCodeReqViewModel {
    Mail: string;

    constructor(mail: string) {
        this.Mail = mail;
    }
}

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

class UpdateMemberPublicInfoReqViewModel {
    Birthday: Date;
    Interest: string;
    Job: string;
    Education: string;
    MemberPublicInfo: MemberPublicInfoEnum;

    constructor(birthday: Date, interest: string, job: string, education: string, memberPublicInfo: MemberPublicInfoEnum) {
        this.Birthday = birthday;
        this.Interest = interest;
        this.Job = job;
        this.Education = education;
        this.MemberPublicInfo = memberPublicInfo;
    }
}

class ResetPasswordReqViewModel {
    Account: string;
    Mail: string;

    constructor(account: string, mail: string) {
        this.Account = account;
        this.Mail = mail;
    }
}

enum ResponseStatusEnum {
    /// <summary>
    /// Error
    /// </summary>
    Error = 0,

    /// <summary>
    /// Success
    /// </summary>
    Success = 1
}

enum MemberPublicInfoEnum {
    /// <summary>
    /// 全部不公開
    /// </summary>
    全部不公開 = 0,

    /// <summary>
    /// 公開生日
    /// </summary>
    公開生日 = 1,

    /// <summary>
    /// 公開興趣
    /// </summary>
    公開興趣 = 2,

    /// <summary>
    /// 公開工作
    /// </summary>
    公開工作 = 4,

    /// <summary>
    /// 公開學歷
    /// </summary>
    公開學歷 = 8,

    /// <summary>
    /// 公開生日 | 公開興趣 | 公開工作 | 公開學歷
    /// </summary>
    全部公開 = 公開生日 | 公開興趣 | 公開工作 | 公開學歷
}