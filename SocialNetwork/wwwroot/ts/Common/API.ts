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
            success: (res: ResponseViewModel<Res>) => {
                if (res.Status == ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    else {
                        if (successFunc)
                            successFunc(res);

                        Swal.close();
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
            success: (res: ResponseViewModel<Res>) => {
                if (res.Status == ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    else {
                        if (successFunc)
                            successFunc(res);

                        Swal.close();
                    }

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
            success: (res: ResponseViewModel<Res>) => {
                if (res.Status == ResponseStatusEnum.Success) {
                    if (isShowSuccessMsg) {
                        if (isNotification)
                            Common.SweetAlertNotification(true, res.Message);
                        else
                            Common.SweetAlertSuccess(res, successFunc);
                    }
                    else {
                        if (successFunc)
                            successFunc(res);

                        Swal.close();
                    }

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
        success: (res: ResponseViewModel<object>) => {
            if (res.Status == ResponseStatusEnum.Success) {
                if (isShowSuccessMsg) {
                    if (isNotification)
                        Common.SweetAlertNotification(true, res.Message);
                    else
                        Common.SweetAlertSuccess(res, successFunc);
                }
                else {
                    if (successFunc)
                        successFunc(res);

                    Swal.close();
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
        success: (res: ResponseViewModel<object>) => {
            if (res.Status == ResponseStatusEnum.Success) {
                if (isShowSuccessMsg) {
                    if (isNotification)
                        Common.SweetAlertNotification(true, res.Message);
                    else
                        Common.SweetAlertSuccess(res, successFunc);
                }
                else {
                    if (successFunc)
                        successFunc(res);

                    Swal.close();
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
 * 登入 API
 */
function LoginAPI(loadingMsg: string, model: LoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    BasePostAPIV3<LoginReqViewModel>(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * Google 第三方登入 API
 */
function GoogleLoginAPI(loadingMsg: string, model: GoogleLoginReqViewModel, successFunc: Function, errorFunc: Function): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    BasePostAPIV3<GoogleLoginReqViewModel>(loadingMsg, "/MemberApi/GoogleLogin", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 寄送驗證碼 API
 */
function SendVCodeAPI(loadingMsg: string, model: SendVCodeReqViewModel, successFunc: Function, errorFunc: Function): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    BasePostAPIV3<SendVCodeReqViewModel>(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 註冊 API
 */
function SignupAPI(loadingMsg: string, model: SignupReqViewModel, successFunc: Function, errorFunc: Function): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    BasePostAPIV3<SignupReqViewModel>(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 更新會員公開資訊 API
 */
function UpdateMemberPublicInfoAPI(loadingMsg: string, model: UpdateMemberPublicInfoReqViewModel, successFunc: Function, errorFunc: Function): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    BasePostAPIV3<UpdateMemberPublicInfoReqViewModel>(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 重設密碼 Step1 API
 * 申請重設密碼、建立重設密碼URL
 */
function ResetPasswordAPI(loadingMsg: string, model: ResetPasswordReqViewModel): void {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    BasePostAPIV3<ResetPasswordReqViewModel>(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 重設密碼 Step2 API
 */
function ResetPasswordConfirmAPI(loadingMsg: string, model: ResetPasswordConfirmReqViewModel, successFunc: Function, errorFunc: Function): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    BasePostAPIV3<ResetPasswordConfirmReqViewModel>(loadingMsg, "/MemberApi/ResetPasswordConfirm", model, successFunc, errorFunc), isNotification, isShowSuccessMsg;
}

/**
 * 登出 API
 */
function LogoutAPI(loadingMsg: string, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    Common.SweetAlertConfirm(confirmTitle,
        () => BaseGetAPI(loadingMsg, "/MemberApi/Logout", successFunc, errorFunc, isNotification, isShowSuccessMsg));
}

/**
 * 更新會員狀態 API
 */
function UpdateMemberStatusAPI(model: UpdateMemberStatusReqViewModel): void {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = true;
    let isShowSuccessMsg = true;

    BasePostAPIV3<UpdateMemberStatusReqViewModel>('', "/MemberApi/UpdateMemberStatus", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得當前會員資訊 API
 */
async function GetCurrentMemberInfoAPI(): Promise<GetMemberInfoResViewModel> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BaseGetAPI<GetMemberInfoResViewModel>('', "/MemberApi/GetCurrentMemberInfo", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得會員資訊 API
 */
async function GetMemberInfoAPI(memberID: number): Promise<GetMemberInfoResViewModel> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BaseGetAPI<GetMemberInfoResViewModel>('', `/MemberApi/GetMemberInfo/${memberID}`, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 更新會員資訊 API
 */
function UpdateMemberInfoAPI(loadingMsg: string, formData: FormData, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIByFormData(loadingMsg, "/MemberApi/UpdateMemberInfo", formData, successFunc, errorFunc, isNotification, isShowSuccessMsg));
}

/**
 * 密碼變更 API
 */
function ChangePasswordAPI(loadingMsg: string, model: ChangePasswordReqViewModel, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<ChangePasswordReqViewModel>(loadingMsg, "/MemberApi/ChangePassword", model, successFunc, errorFunc, isNotification, isShowSuccessMsg));
}

/**
 * 搜尋會員 API
 */
async function SearchMemberAPI(model: SearchMemberReqViewModel): Promise<SearchMemberResViewModel> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV2<SearchMemberReqViewModel, SearchMemberResViewModel>('', `/MemberApi/SearchMember`, model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

// Post

/**
 * 發佈貼文 API
 */
function PublishPostAPI(loadingMsg: string, formData: FormData, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIByFormData(loadingMsg, "/PostApi/PublishPost", formData, successFunc, errorFunc, isNotification, isShowSuccessMsg));
}

/**
 * 取得首頁貼文 (自己和朋友) API
 */
async function GetIndexPostAPI(model: QueryRowMemberReqViewModel): Promise<Array<GetPostResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV2<CommonMemberViewModel, Array<GetPostResViewModel>>('', "/PostApi/GetIndexPost", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得會員貼文 API
 */
async function GetHomePagePostAPI(model: QueryRowMemberReqViewModel): Promise<Array<GetPostResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV2<CommonMemberViewModel, Array<GetPostResViewModel>>('', "/PostApi/GetHomePagePost", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得該貼文所有留言 API
 */
async function GetPostAllMsgAPI(model: CommonPostViewModel): Promise<Array<GetPostMsgResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV2<CommonPostViewModel, Array<GetPostMsgResViewModel>>('', "/PostApi/GetPostAllMsg", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 貼文按讚 or 取消按讚 API
 */
function TogglePostLikeAPI(model: TogglePostLikeReqViewModel, successFunc: Function, errorFunc: Function): void {
    let isNotification = false;
    let isShowSuccessMsg = false;

    BasePostAPIV3<TogglePostLikeReqViewModel>('', "/PostApi/TogglePostLike", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 發送貼文留言 API
 */
async function SendPostMsgAPI(model: SendPostMsgReqViewModel, successFunc: Function, errorFunc: Function): Promise<GetPostMsgResViewModel> {
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV2<SendPostMsgReqViewModel, GetPostMsgResViewModel>('', "/PostApi/SendPostMsg", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 刪除貼文 API
 */
function DeletePostAPI(model: CommonPostViewModel, successFunc: Function, errorFunc: Function, confirmTitle: string): void {
    let isNotification = false;
    let isShowSuccessMsg = true;

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<CommonPostViewModel>('', "/PostApi/DeletePostAsync", model, successFunc, errorFunc, isNotification, isShowSuccessMsg));
}

// Friend

/**
 * 取得好友清單 API
 */
async function GetFriendListAPI(): Promise<Array<GetFriendListResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV1<Array<GetFriendListResViewModel>>('', "/FriendApi/GetFriendList", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得好友邀請清單 API
 */
async function GetFriendInvitationListAPI(): Promise<Array<GetFriendListResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV1<Array<GetFriendListResViewModel>>('', "/FriendApi/GetFriendInvitationList", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得您送出的好友邀請清單 API
 */
async function GetSendFriendInvitationListAPI(): Promise<Array<GetFriendListResViewModel>> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV1<Array<GetFriendListResViewModel>>('', "/FriendApi/GetSendFriendInvitationList", successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 取得好友狀態 API
 */
async function GetFriendStatusAPI(model: CommonMemberViewModel): Promise<GetFriendStatusResViewModel> {
    let successFunc = () => { };
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    return await BasePostAPIV2<CommonMemberViewModel, GetFriendStatusResViewModel>('', "/FriendApi/GetFriendStatus", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}

/**
 * 發送好友邀請 API
 */
function SendFriendInvitationAPI(model: CommonMemberViewModel, successFunc: Function, confirmTitle: string): void {
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<CommonMemberViewModel>('', "/FriendApi/SendFriendInvitation", model, successFunc, errorFunc, isNotification, isShowSuccessMsg));
}

/**
 * 判斷好友邀請 (接受 or 拒絕) API
 */
function DecideFriendInvitationAPI(model: DecideFriendInvitationReqViewModel, successFunc: Function, confirmTitle: string): void {
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<DecideFriendInvitationReqViewModel>('', "/FriendApi/DecideFriendInvitation", model, successFunc, errorFunc, isNotification, isShowSuccessMsg));
}

/**
 * 收回好友邀請 API
 */
function RevokeFriendInvitationAPI(model: CommonMemberViewModel, successFunc: Function, confirmTitle: string): void {
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<CommonMemberViewModel>('', "/FriendApi/RevokeFriendInvitation", model, successFunc, errorFunc, isNotification, isShowSuccessMsg));
}

/**
 * 刪除好友 API
 */
function DeleteFriendAPI(model: CommonMemberViewModel, successFunc: Function, confirmTitle: string): void {
    let errorFunc = () => { };
    let isNotification = false;
    let isShowSuccessMsg = false;

    Common.SweetAlertConfirm(confirmTitle,
        () => BasePostAPIV3<CommonMemberViewModel>('', "/FriendApi/DeleteFriend", model, successFunc, errorFunc, isNotification, isShowSuccessMsg));
}