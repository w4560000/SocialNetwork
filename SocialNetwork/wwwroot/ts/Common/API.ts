import { Enum, Request, Response, Common } from "../Common/CommonInferface.js";
//import Swal from '../../lib/sweetalert2/dist/sweetalert2.js';

/**
 * 封裝基礎 Http 
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
            success: (res: Response.ResponseViewModel<Res>) => {
                if (res.Status == Enum.ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    else
                        Swal.close();

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
 * 封裝基礎 Http Post (無 Request Param 、 有 Response Data )
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BasePostAPIV1<Res>(
    loadingMsg: string,
    api: string,
    successFunc?: Function,
    errorFunc?: Function,
    isNotification: boolean = false,
    isShowSuccessMsg: boolean = true) : Promise<Res>{
    return new Promise(function (resolve, reject) {
        if (loadingMsg)
            Common.SweetAlertLoading(loadingMsg);

        $.ajax({
            method: "POST",
            url: api,
            headers: {
                "RequestVerificationToken": $("#RequestVerificationToken").val() as string
            },
            async: false,
            success: (res: Response.ResponseViewModel<Res>) => {
                if (res.Status == Enum.ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    else
                        Swal.close();

                    resolve(res.Data as Res);
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
 * 封裝基礎 Http Post (有 Request Param 、 有 Response Data )
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BasePostAPIV2<T, Res>(
    loadingMsg: string,
    api: string,
    model: T,
    successFunc?: Function,
    errorFunc?: Function,
    isNotification: boolean = false,
    isShowSuccessMsg: boolean = true) : Promise<Res>{
    return new Promise(function (resolve, reject) {
        if (loadingMsg)
            Common.SweetAlertLoading(loadingMsg);
        
        $.ajax({
            method: "POST",
            url: api,
            headers: {
                "RequestVerificationToken": $("#RequestVerificationToken").val() as string
            },
            data: JSON.stringify(model),
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: (res: Response.ResponseViewModel<Res>) => {
                if (res.Status == Enum.ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    else
                        Swal.close();

                    resolve(res.Data as Res);
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
 * 封裝基礎 Http Post (有 Request Param 、 無 Response Data )
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param model 傳送參數 Model
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */
function BasePostAPIV3<T>(
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
        headers: {
            "RequestVerificationToken": $("#RequestVerificationToken").val() as string
        },
        data: JSON.stringify(model),
        dataType: "json",
        contentType: "application/json",
        success: (res: Response.ResponseViewModel<object>) => {
            if (res.Status == Enum.ResponseStatusEnum.Success) {
                if (isShowSuccessMsg) {
                    if (isNotification)
                        Common.SweetAlertNotification(true, res.Message);
                    else
                        Common.SweetAlertSuccess(res, successFunc);
                }
                else
                    Swal.close();
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
    isNotification: boolean = false,
    isShowSuccessMsg: boolean = true) {
    if (loadingMsg)
        Common.SweetAlertLoading(loadingMsg);

    $.ajax({
        method: "POST",
        url: api,
        headers: {
            "RequestVerificationToken": $("#RequestVerificationToken").val() as string
        },
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false,
        success: (res: Response.ResponseViewModel<object>) => {
            if (res.Status == Enum.ResponseStatusEnum.Success) {
                if (isShowSuccessMsg) {
                    if (isNotification)
                        Common.SweetAlertNotification(true, res.Message);
                    else
                        Common.SweetAlertSuccess(res, successFunc);
                }
                else
                    Swal.close();
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
export function LoginAPI(loadingMsg: string, model: Request.LoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIV3<Request.LoginReqViewModel>(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}

/**
 * Google 第三方登入 API
 */
export function GoogleLoginAPI(loadingMsg: string, model: Request.GoogleLoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIV3<Request.GoogleLoginReqViewModel>(loadingMsg, "/MemberApi/GoogleLogin", model, successFunc, errorFunc);
}

/**
 * 寄送驗證碼 API
 */
export function SendVCodeAPI(loadingMsg: string, model: Request.SendVCodeReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIV3<Request.SendVCodeReqViewModel>(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}

/**
 * 註冊 API
 */
export function SignupAPI(loadingMsg: string, model: Request.SignupReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIV3<Request.SignupReqViewModel>(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}

/**
 * 更新會員公開資訊 API
 */
export function UpdateMemberPublicInfoAPI(loadingMsg: string, model: Request.UpdateMemberPublicInfoReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIV3<Request.UpdateMemberPublicInfoReqViewModel>(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc);
}

/**
 * 重設密碼 Step1 API
 * 申請重設密碼、建立重設密碼URL
 */
export function ResetPasswordAPI(loadingMsg: string, model: Request.ResetPasswordReqViewModel): void {
    let successFunc = () => { };
    let errorFunc = () => { };

    BasePostAPIV3<Request.ResetPasswordReqViewModel>(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc);
}

/**
 * 重設密碼 Step2 API
 */
export function ResetPasswordConfirmAPI(loadingMsg: string, model: Request.ResetPasswordConfirmReqViewModel, successFunc: Function, errorFunc: Function): void {
    BasePostAPIV3<Request.ResetPasswordConfirmReqViewModel>(loadingMsg, "/MemberApi/ResetPasswordConfirm", model, successFunc, errorFunc);
}

/**
 * 登出 API
 */
export function LogoutAPI(loadingMsg: string, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    Common.SweetAlertConfirm(confirmTitle,
        () => BaseGetAPI(loadingMsg, "/MemberApi/Logout", successFunc, errorFunc));
}

/**
 * 更新會員狀態 API
 */
export function UpdateMemberStatusAPI(model: Request.UpdateMemberStatusReqViewModel): void {
    let successFunc = () => { };
    let errorFunc = () => { };

    let isNotification = true;
    let isShowSuccessMsg = true;

    BasePostAPIV3<Request.UpdateMemberStatusReqViewModel>('', "/MemberApi/UpdateMemberStatus", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得當前會員資訊 API
 */
export async function GetCurrentMemberInfoAPI(): Promise<Response.GetMemberInfoResViewModel> {
    let successFunc = () => { };
    let errorFunc = () => { };

    let isNotification = false;
    let isShowSuccessMsg = false;
    return await BaseGetAPI<Response.GetMemberInfoResViewModel>('', "/MemberApi/GetCurrentMemberInfo", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得會員資訊 API
 */
export async function GetMemberInfoAPI(memberID: number): Promise<Response.GetMemberInfoResViewModel> {
    let successFunc = () => { };
    let errorFunc = () => { };

    let isNotification = false;
    let isShowSuccessMsg = false;
    return await BaseGetAPI<Response.GetMemberInfoResViewModel>('', `/MemberApi/GetMemberInfo/${memberID}`, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 更新會員資訊 API
 */
export function UpdateMemberInfoAPI(loadingMsg: string, formData: FormData, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIByFormData(loadingMsg, "/MemberApi/UpdateMemberInfo", formData, successFunc, errorFunc));
}

/**
 * 密碼變更 API
 */
export function ChangePasswordAPI(loadingMsg: string, model: Request.ChangePasswordReqViewModel, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<Request.ChangePasswordReqViewModel>(loadingMsg, "/MemberApi/ChangePassword", model, successFunc, errorFunc));
}

// Post

/**
 * 發佈貼文 API
 */
export function PublishPostAPI(loadingMsg: string, formData: FormData, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIByFormData(loadingMsg, "/PostApi/PublishPost", formData, successFunc, errorFunc));
}

// Friend

/**
 * 取得好友清單 API
 */
export async function GetFriendListAPI(): Promise<Array<Response.GetFriendListResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };

    let isNotification = false;
    let isShowSuccessMsg = false;
    return await BasePostAPIV1<Array<Response.GetFriendListResViewModel>>('', "/FriendApi/GetFriendList", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得好友邀請清單 API
 */
export async function GetFriendInvitationListAPI(): Promise<Array<Response.GetFriendListResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };

    let isNotification = false;
    let isShowSuccessMsg = false;
    return await BasePostAPIV1<Array<Response.GetFriendListResViewModel>>('', "/FriendApi/GetFriendInvitationList", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得您送出的好友邀請清單 API
 */
export async function GetSendFriendInvitationListAPI(): Promise<Array<Response.GetFriendListResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };

    let isNotification = false;
    let isShowSuccessMsg = false;
    return await BasePostAPIV1<Array<Response.GetFriendListResViewModel>>('', "/FriendApi/GetSendFriendInvitationList", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得好友狀態 API
 */
export async function GetFriendStatusAPI(model: Request.CommonMemberViewModel): Promise<Response.GetFriendStatusResViewModel> {
    let successFunc = () => { };
    let errorFunc = () => { };

    let isNotification = false;
    let isShowSuccessMsg = false;
    return await BasePostAPIV2<Request.CommonMemberViewModel, Response.GetFriendStatusResViewModel>('', "/FriendApi/GetFriendStatus", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 發送好友邀請 API
 */
export function SendFriendInvitationAPI(model: Request.CommonMemberViewModel, successFunc: Function, confirmTitle: string): void {
    let errorFunc = () => { };

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<Request.CommonMemberViewModel>('', "/FriendApi/SendFriendInvitation", model, successFunc, errorFunc));
}

/**
 * 判斷好友邀請 (接受 or 拒絕) API
 */
export function DecideFriendInvitationAPI(model: Request.DecideFriendInvitationReqViewModel, successFunc: Function, confirmTitle: string): void {
    let errorFunc = () => { };

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<Request.DecideFriendInvitationReqViewModel>('', "/FriendApi/DecideFriendInvitation", model, successFunc, errorFunc));
}

/**
 * 收回好友邀請 API
 */
export function RevokeFriendInvitationAPI(model: Request.CommonMemberViewModel, successFunc: Function, confirmTitle: string): void {
    let errorFunc = () => { };
    
    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<Request.CommonMemberViewModel>('', "/FriendApi/RevokeFriendInvitation", model, successFunc, errorFunc));
}

/**
 * 刪除好友 API
 */
export function DeleteFriendAPI(model: Request.CommonMemberViewModel, successFunc: Function, confirmTitle: string): void {
    let errorFunc = () => { };

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<Request.CommonMemberViewModel>('', "/FriendApi/DeleteFriend", model, successFunc, errorFunc));
}