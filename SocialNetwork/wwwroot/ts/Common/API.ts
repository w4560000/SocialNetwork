function LoginAPI(model: SingupReqViewModel, success: Function, error: Function) :void{
    $.post("/Member/Login", model,
        (res: ResponseViewModel<object>) => { 
            if (res.Status == ResponseStatusEnum.Success)
                success();
            else
                error();
        }
    );
}

function SendVCodeAPI(model: SendVCodeReqViewModel, success: Function, error: Function): void {
    $.post("/Member/SendVCode", model,
        (res: ResponseViewModel<object>) => {
            debugger;
            if (res.Status == ResponseStatusEnum.Success)
                success(res);
            else
                error(res);
        }
    );
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
    Status: ResponseStatusEnum;

    /// <summary>
    /// 回應訊息
    /// </summary>
    Message: string;

    /// <summary>
    /// 回應資料
    /// </summary>
    Data: T;
}


class SingupReqViewModel {
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

