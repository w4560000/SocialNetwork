/**
 * 通用的 Member ViewModel
 * */
var CommonMemberViewModel = /** @class */ (function () {
    function CommonMemberViewModel(memberID) {
        this.MemberID = memberID;
    }
    return CommonMemberViewModel;
}());
/**
 * 通用的 Post ViewModel
 * */
var CommonPostViewModel = /** @class */ (function () {
    function CommonPostViewModel(postKey) {
        this.PostKey = postKey;
    }
    return CommonPostViewModel;
}());
/**
 * 查詢資料筆數 Member ViewModel
 * */
var QueryRowMemberReqViewModel = /** @class */ (function () {
    function QueryRowMemberReqViewModel(memberID, queryRowNo) {
        this.MemberID = memberID;
        this.QueryRowNo = queryRowNo;
    }
    return QueryRowMemberReqViewModel;
}());
/**
 * 登入 Request ViewModel
 * */
var LoginReqViewModel = /** @class */ (function () {
    function LoginReqViewModel(account, password) {
        this.Account = account;
        this.Password = password;
    }
    return LoginReqViewModel;
}());
/**
 * Google 第三方登入 Request ViewModel
 * */
var GoogleLoginReqViewModel = /** @class */ (function () {
    function GoogleLoginReqViewModel(code) {
        this.Code = code;
    }
    return GoogleLoginReqViewModel;
}());
/**
 * 寄送驗證碼 Request ViewModel
 * */
var SendVCodeReqViewModel = /** @class */ (function () {
    function SendVCodeReqViewModel(mail) {
        this.Mail = mail;
    }
    return SendVCodeReqViewModel;
}());
/**
 * 註冊 Request ViewModel
 * */
var SignupReqViewModel = /** @class */ (function () {
    function SignupReqViewModel(nickName, account, password, passwordCheck, mail, vCode) {
        this.NickName = nickName;
        this.Account = account;
        this.Password = password;
        this.PasswordCheck = passwordCheck;
        this.Mail = mail;
        this.VCode = vCode;
    }
    return SignupReqViewModel;
}());
/**
 * 更新會員公開資訊 Request ViewModel
 * */
var UpdateMemberPublicInfoReqViewModel = /** @class */ (function () {
    function UpdateMemberPublicInfoReqViewModel(brithday, interest, job, education, infoStatus) {
        this.Brithday = brithday;
        this.Interest = interest;
        this.Job = job;
        this.Education = education;
        this.InfoStatus = infoStatus;
    }
    return UpdateMemberPublicInfoReqViewModel;
}());
/**
 * 重設密碼 Step1 Request ViewModel
 * */
var ResetPasswordReqViewModel = /** @class */ (function () {
    function ResetPasswordReqViewModel(account, mail) {
        this.Account = account;
        this.Mail = mail;
    }
    return ResetPasswordReqViewModel;
}());
/**
 * 重設密碼 Step2 Request ViewModel
 * */
var ResetPasswordConfirmReqViewModel = /** @class */ (function () {
    function ResetPasswordConfirmReqViewModel(password, passwordCheck, guid) {
        this.Password = password;
        this.PasswordCheck = passwordCheck;
        this.Guid = guid;
    }
    return ResetPasswordConfirmReqViewModel;
}());
/**
 * 更新會員狀態 Request ViewModel
 * */
var UpdateMemberStatusReqViewModel = /** @class */ (function () {
    function UpdateMemberStatusReqViewModel(status) {
        this.Status = status;
    }
    return UpdateMemberStatusReqViewModel;
}());
/**
 * 密碼變更 Request ViewModel
 * */
var ChangePasswordReqViewModel = /** @class */ (function () {
    function ChangePasswordReqViewModel(oldPassword, newPassword, newPasswordCheck) {
        this.OldPassword = oldPassword;
        this.NewPassword = newPassword;
        this.NewPasswordCheck = newPasswordCheck;
    }
    return ChangePasswordReqViewModel;
}());
/**
 * 判斷好友邀請 Request ViewModel
 * */
var DecideFriendInvitationReqViewModel = /** @class */ (function () {
    function DecideFriendInvitationReqViewModel(memberID, decision) {
        this.MemberID = memberID;
        this.Decision = decision;
    }
    return DecideFriendInvitationReqViewModel;
}());
/**
 * 貼文按讚 or 取消按讚 Request ViewModel
 * */
var TogglePostLikeReqViewModel = /** @class */ (function () {
    function TogglePostLikeReqViewModel(postKey, toggle) {
        this.PostKey = postKey;
        this.Toggle = toggle;
    }
    return TogglePostLikeReqViewModel;
}());
/**
 * 發送貼文留言 Request ViewModel
 * */
var SendPostMsgReqViewModel = /** @class */ (function () {
    function SendPostMsgReqViewModel(postKey, msg) {
        this.PostKey = postKey;
        this.Msg = msg;
    }
    return SendPostMsgReqViewModel;
}());
/**
 * 搜尋會員 Request ViewModel
 * */
var SearchMemberReqViewModel = /** @class */ (function () {
    function SearchMemberReqViewModel(nickName) {
        this.NickName = nickName;
    }
    return SearchMemberReqViewModel;
}());
