/**
 * 封裝基礎 Http Get
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 */
function BaseGetAPI(loadingMsg: string, api: string, successFunc?: Function, errorFunc?: Function) {
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);

    $.ajax({
        method: "Get",
        url: api,
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

/**
 * 封裝基礎 Http Post
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 */
function BasePostAPI<T>(loadingMsg: string, api: string, model: T, successFunc?: Function, errorFunc?: Function) {
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

/**
 * 登入 API
 */
function LoginAPI(loadingMsg: string, model: LoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPI<LoginReqViewModel>(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}

/**
 * Google 第三方登入 API
 */
function GoogleLoginAPI(loadingMsg: string, model: GoogleLoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPI<GoogleLoginReqViewModel>(loadingMsg, "/MemberApi/GoogleLogin", model, successFunc, errorFunc);
}

/**
 * 寄送驗證碼 API
 */
function SendVCodeAPI(loadingMsg: string, model: SendVCodeReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPI<SendVCodeReqViewModel>(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}

/**
 * 註冊 API
 */
function SignupAPI(loadingMsg: string, model: SignupReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPI<SignupReqViewModel>(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}

/**
 * 更新會員公開資訊 API
 */
function UpdateMemberPublicInfoAPI(loadingMsg: string, model: UpdateMemberPublicInfoReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPI<UpdateMemberPublicInfoReqViewModel>(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc);
}

/**
 * 重設密碼 Step1 API
 * 申請重設密碼、建立重設密碼URL
 */
function ResetPasswordAPI(loadingMsg: string, model: ResetPasswordReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPI<ResetPasswordReqViewModel>(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc);
}

/**
 * 重設密碼 Step2 API
 */
function ResetPasswordConfirmAPI(loadingMsg: string, model: ResetPasswordConfirmReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPI<ResetPasswordConfirmReqViewModel>(loadingMsg, "/MemberApi/ResetPasswordConfirm", model, successFunc, errorFunc);
}

/**
 * 登出 API
 */
function LogoutAPI(loadingMsg: string, successFunc: Function, errorFunc: Function): void {
    BaseGetAPI(loadingMsg, "/MemberApi/Logout", successFunc, errorFunc);
}