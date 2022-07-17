function LoginAPI(account: string, password: string) :void{
    $.post("/Member/Login", new LoginViewModel(account, password),
        (res: ResponseViewModel<object>) => { 
            if (res.Status == ResponseStatusEnum.Success)
                // 導主頁
                window.location.href = "/Home/Index";
            else
                Popup('loginError');
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


class LoginViewModel {
    Account: string;
    Password: string;

    constructor(account: string, password: string) {
        this.Account = account;
        this.Password = password;
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

