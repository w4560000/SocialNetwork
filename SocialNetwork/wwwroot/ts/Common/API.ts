
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