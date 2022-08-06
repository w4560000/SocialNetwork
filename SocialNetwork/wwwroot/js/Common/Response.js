/**
 * 共用回應 ViewModel
 * */
var ResponseViewModel = /** @class */ (function () {
    function ResponseViewModel() {
    }
    return ResponseViewModel;
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
    function UpdateMemberPublicInfoReqViewModel(birthday, interest, job, education, memberPublicInfo) {
        this.Birthday = birthday;
        this.Interest = interest;
        this.Job = job;
        this.Education = education;
        this.MemberPublicInfo = memberPublicInfo;
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
