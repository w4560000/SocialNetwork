/**
 * 封裝基礎 Http Get
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BaseGetAPI<Res>(
    loadingMsg: string,
    api: string,
    successFunc?: Function,
    errorFunc?: Function,
    isNotification: boolean = false,
    isShowSuccessMsg: boolean = true) : Promise<Res> {
    return new Promise(function (resolve, reject) {
        if (loadingMsg)
            Common.SweetAlertLoading(loadingMsg);

        $.ajax({
            method: "Get",
            url: api,
            success: (res: ResponseViewModel<Res>) => {
                if (res.Status == ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    resolve(res.Data as Res);
                }
                else {
                    if (isNotification)
                        Common.SweetAlertNotification(false, res.Message);
                    else
                        Common.SweetAlertError(res, errorFunc);
                }
                reject('error');
            },
            error: (e) => {
                console.log(e);
                Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
                reject(e)
            }
        });
    });
}

/**
 * 封裝基礎 Http Post
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BasePostAPI<T, Res>(
    loadingMsg: string,
    api: string,
    model: T,
    successFunc?: Function,
    errorFunc?: Function,
    isNotification: boolean = false,
    isShowSuccessMsg: boolean = true) {
    return new Promise(function (resolve, reject) {
        if (loadingMsg)
            Common.SweetAlertLoading(loadingMsg);

        $.ajax({
            method: "POST",
            url: api,
            data: JSON.stringify(model),
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: (res: ResponseViewModel<Res>) => {
                if (res.Status == ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }

                    resolve(res.Data);
                }
                else {
                    if (isNotification)
                        Common.SweetAlertNotification(false, res.Message);
                    else
                        Common.SweetAlertError(res, errorFunc);

                    reject('error');
                }
            },
            error: (e) => {
                console.log(e);
                Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
                reject(e)
            }
        });
    });
}

/**
 * 封裝基礎 Http Post
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BasePostAPIWithVoid<T>(
    loadingMsg: string,
    api: string,
    model: T,
    successFunc?: Function,
    errorFunc?: Function,
    isNotification: boolean = false,
    isShowSuccessMsg: boolean = true) {
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
                if (isShowSuccessMsg) {
                    if (isNotification)
                        Common.SweetAlertNotification(true, res.Message);
                    else
                        Common.SweetAlertSuccess(res, successFunc);
                }
            }
            else {
                if (isNotification)
                    Common.SweetAlertNotification(false, res.Message);
                else
                    Common.SweetAlertError(res, errorFunc);
            }
        },
        error: (e) => {
            console.log(e);
            Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
        }
    });
}

/**
 * 封裝基礎 Http Post By FormData
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param formData 傳送參數 FormData
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否顯示快顯
 */
function BasePostAPIByFormData(
    loadingMsg: string,
    api: string,
    formData: FormData,
    successFunc?: Function,
    errorFunc?: Function,
    isNotification: boolean = false) {
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);

    $.ajax({
        method: "POST",
        url: api,
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false,
        success: (res: ResponseViewModel<object>) => {
            if (res.Status == ResponseStatusEnum.Success) {
                if (isNotification)
                    Common.SweetAlertNotification(true, res.Message);
                else
                    Common.SweetAlertSuccess(res, successFunc);
            }
            else {
                if (isNotification)
                    Common.SweetAlertNotification(false, res.Message);
                else
                    Common.SweetAlertError(res, errorFunc);
            }
        },
        error: (e) => {
            console.log(e);
            Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
        }
    });
}

/**
 * 登入 API
 */
function LoginAPI(loadingMsg: string, model: LoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIWithVoid<LoginReqViewModel>(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}

/**
 * Google 第三方登入 API
 */
function GoogleLoginAPI(loadingMsg: string, model: GoogleLoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIWithVoid<GoogleLoginReqViewModel>(loadingMsg, "/MemberApi/GoogleLogin", model, successFunc, errorFunc);
}

/**
 * 寄送驗證碼 API
 */
function SendVCodeAPI(loadingMsg: string, model: SendVCodeReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIWithVoid<SendVCodeReqViewModel>(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}

/**
 * 註冊 API
 */
function SignupAPI(loadingMsg: string, model: SignupReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIWithVoid<SignupReqViewModel>(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}

/**
 * 更新會員公開資訊 API
 */
function UpdateMemberPublicInfoAPI(loadingMsg: string, model: UpdateMemberPublicInfoReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIWithVoid<UpdateMemberPublicInfoReqViewModel>(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc);
}

/**
 * 重設密碼 Step1 API
 * 申請重設密碼、建立重設密碼URL
 */
function ResetPasswordAPI(loadingMsg: string, model: ResetPasswordReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIWithVoid<ResetPasswordReqViewModel>(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc);
}

/**
 * 重設密碼 Step2 API
 */
function ResetPasswordConfirmAPI(loadingMsg: string, model: ResetPasswordConfirmReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIWithVoid<ResetPasswordConfirmReqViewModel>(loadingMsg, "/MemberApi/ResetPasswordConfirm", model, successFunc, errorFunc);
}

/**
 * 登出 API
 */
function LogoutAPI(loadingMsg: string, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    Common.SweetAlertConfirm(confirmTitle,
        () => BaseGetAPI(loadingMsg, "/MemberApi/Logout", successFunc, errorFunc));
}

/**
 * 更新會員狀態 API
 */
function UpdateMemberStatusAPI(model: UpdateMemberStatusReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIWithVoid<UpdateMemberStatusReqViewModel>('', "/MemberApi/UpdateMemberStatus", model, successFunc, errorFunc);
}

/**
 * 取得當前會員資訊 API
 */
async function GetCurrentMemberInfoAPI(successFunc: Function, errorFunc: Function): Promise<GetMemberInfoResViewModel> {
    let isNotification = false;
    let isShowSuccessMsg = false;
    return await BaseGetAPI<GetMemberInfoResViewModel>('', "/MemberApi/GetCurrentMemberInfo", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得會員資訊 API
 */
async function GetMemberInfoAPI(memberID: number, successFunc: Function, errorFunc: Function): Promise<GetMemberInfoResViewModel> {
    let isNotification = false;
    let isShowSuccessMsg = false;
    return await BaseGetAPI<GetMemberInfoResViewModel>('', `/MemberApi/GetMemberInfo/${memberID}`, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 密碼變更 API
 */
function ChangePasswordAPI(loadingMsg: string, model: ChangePasswordReqViewModel, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    Common.SweetAlertConfirm(confirmTitle, () =>
        BasePostAPIWithVoid<ChangePasswordReqViewModel>(loadingMsg, "/MemberApi/ChangePassword", model, successFunc, errorFunc));
}

// Post

/**
 * 發佈貼文 API
 */
function PublishPostAPI(loadingMsg: string, formData: FormData, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIByFormData(loadingMsg, "/PostApi/PublishPost", formData, successFunc, errorFunc));
}