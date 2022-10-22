"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateMemberStatusReqViewModel = exports.UpdateMemberPublicInfoReqViewModel = exports.Toast = exports.SignupReqViewModel = exports.SendVCodeReqViewModel = exports.ResponseViewModel = exports.ResponseStatusEnum = exports.ResetPasswordReqViewModel = exports.ResetPasswordConfirmReqViewModel = exports.MemberStatusEnum = exports.MemberPublicInfoEnum = exports.LoginReqViewModel = exports.GoogleLoginResViewModel = exports.GoogleLoginReqViewModel = exports.GetMemberInfoResViewModel = exports.GetFriendStatusResViewModel = exports.GetFriendListResViewModel = exports.FriendStatusEnum = exports.Friend = exports.DecideFriendInvitationReqViewModel = exports.DecideFriendInvitationEnum = exports.CommonMemberViewModel = exports.Common = exports.ChangePasswordReqViewModel = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var API = _interopRequireWildcard(require("../Common/API"));

var Enum = _interopRequireWildcard(require("../Common/Enum"));

var Request = _interopRequireWildcard(require("../Common/Request"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Common = {
  /**
   * 驗證上傳圖檔的附檔名
   * @param fileName 上傳圖檔
   */
  ValidateUploadPhotoExtension: function ValidateUploadPhotoExtension(file) {
    return /\.(jpg|jpeg|png|webp|svg|gif)$/.test(file.name);
  },

  /**
   * 驗證上傳圖檔的大小 (限制 5 MB)
   * @param fileName 上傳圖檔
   */
  ValidateUploadPhotoSize: function ValidateUploadPhotoSize(file) {
    return file.size <= 5 * 1024 * 1024;
  },

  /**
   * 刪除錯誤輸入框提示
   * @param e element
   */
  RemoveErrorInput: function RemoveErrorInput(e) {
    return $(e).removeClass('input-error');
  },

  /**
   * 彈窗
   * @param containerID containerID
   * @param func func
   */
  Popup: function Popup(containerID, func) {
    var popBox = $('#' + containerID + '> .popBox')[0];
    var popLayer = $('#' + containerID + '> .popLayer')[0];
    popBox.style.display = popLayer.style.display = "block";
    if (func !== undefined) func;
  },

  /**
   * 關閉彈窗
   * @param containerID containerID
   * @param func func
   */
  ClosePopup: function ClosePopup(containerID, func) {
    var popBox = $('#' + containerID + '> .popBox')[0];
    var popLayer = $('#' + containerID + '> .popLayer')[0];
    popBox.style.display = popLayer.style.display = "none";
    if (func !== undefined) func;
  },

  /**
   * 驗證輸入框
   * @param errorMsg 錯誤提示字
   */
  Validate: function Validate(errorMsg) {
    var error = '';
    Object.keys(errorMsg).forEach(function (key) {
      if (!error && !$('#' + key).val()) {
        $('#' + key).removeClass('input-error');
        error = errorMsg[key];
        $('#' + key).addClass('input-error');
      }
    });
    return error;
  },

  /**
   * SweetAlert 成功彈窗
   * @param res 共用回應 ViewModel
   * @param confirmFunc 確認Func
   */
  SweetAlertSuccess: function SweetAlertSuccess(res, confirmFunc) {
    if (confirmFunc != null) {
      _sweetalert["default"].fire({
        icon: 'success',
        text: res.Message,
        confirmButtonText: '確認',
        allowOutsideClick: false
      }).then(function (result) {
        if (result.isConfirmed) {
          confirmFunc(res);
        }
      });
    } else {
      _sweetalert["default"].fire({
        icon: 'success',
        text: res.Message,
        confirmButtonText: '確認'
      });
    }
  },

  /**
   * SweetAlert 失敗彈窗
   * @param res 共用回應 ViewModel
   * @param confirmFunc 確認Func
   */
  SweetAlertError: function SweetAlertError(res, confirmFunc) {
    if (confirmFunc != null) {
      _sweetalert["default"].fire({
        icon: 'error',
        text: res.Message,
        confirmButtonText: '確認',
        allowOutsideClick: false,
        focusConfirm: false
      }).then(function (result) {
        if (result.isConfirmed) {
          confirmFunc();
        }
      });
    } else {
      _sweetalert["default"].fire({
        icon: 'error',
        text: res.Message,
        confirmButtonText: '確認',
        focusConfirm: false
      });
    }
  },

  /**
   * SweetAlert 失敗彈窗
   * @param msg 錯誤訊息
   * @param confirmFunc 確認Func
   */
  SweetAlertErrorMsg: function SweetAlertErrorMsg(msg, confirmFunc) {
    if (confirmFunc != null) {
      _sweetalert["default"].fire({
        icon: 'error',
        text: msg,
        confirmButtonText: '確認',
        allowOutsideClick: false,
        focusConfirm: false
      }).then(function (result) {
        if (result.isConfirmed) {
          confirmFunc();
        }
      });
    } else {
      _sweetalert["default"].fire({
        icon: 'error',
        text: msg,
        confirmButtonText: '確認',
        focusConfirm: false
      });
    }
  },

  /**
   * SweetAlert Loading 彈窗
   * @param msg 訊息
   */
  SweetAlertLoading: function SweetAlertLoading(msg) {
    _sweetalert["default"].fire({
      title: msg,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: function didOpen() {
        _sweetalert["default"].showLoading();
      }
    });
  },

  /**
   * SweetAlert 轉導
   * @param path 路徑
   * @param pathName 頁面名稱
   */
  SweetAlertRedirect: function SweetAlertRedirect(path, pathName) {
    var timerInterval;

    _sweetalert["default"].fire({
      html: "<b></b> \u79D2\u5F8C \u8DF3\u8F49\u56DE".concat(pathName),
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: function didOpen() {
        _sweetalert["default"].showLoading();

        var b = _sweetalert["default"].getHtmlContainer().querySelector('b');

        timerInterval = setInterval(function () {
          b.textContent = Math.round(_sweetalert["default"].getTimerLeft() / 1000).toString();
        }, 100);
      },
      willClose: function willClose() {
        clearInterval(timerInterval);
      }
    }).then(function (result) {
      /* Read more about handling dismissals below */
      if (result.dismiss === _sweetalert["default"].DismissReason.timer) {
        window.location.href = path;
      }
    });
  },

  /**
   * SweetAlert 確認彈窗
   * @param title 標題
   * @param confirmFunc 確認Func
   */
  SweetAlertConfirm: function SweetAlertConfirm(title, confirmFunc, failConfirmFunc, cancelButtonText) {
    if (cancelButtonText === void 0) {
      cancelButtonText = '取消';
    }

    _sweetalert["default"].fire({
      title: title,
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: cancelButtonText,
      reverseButtons: true
    }).then(function (result) {
      if (result.isConfirmed) confirmFunc();else {
        if (failConfirmFunc != null) failConfirmFunc();
      }
    });
  },

  /**
   * SweetAlert 通知快顯
   * @param IsSuccess 是否操作成功
   * @param title 標題
   */
  SweetAlertNotification: function SweetAlertNotification(IsSuccess, title) {
    Toast.fire({
      icon: IsSuccess ? 'success' : 'error',
      title: title
    });
  },

  /**
   * 頁面註冊 Datepicker
   * @param e HTMLElement
   * @param onSelectFunc SeleteFunc
   */
  DatepickerInit: function DatepickerInit(e, onSelectFunc) {
    e.datepicker({
      changeMonth: true,
      changeYear: true,
      showMonthAfterYear: true,
      yearRange: '1950:2022',
      dateFormat: 'yy-mm-dd',
      onSelect: onSelectFunc
    });
    $("#datepicker").on('change', function () {
      $(this).val("");
    });
    $.datepicker.regional['zh-TW'] = {
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      prevText: "上月",
      nextText: "次月",
      weekHeader: "週"
    };
    $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);
  },

  /**
   * 會員資料公開或隱藏
   * @param e HTMLImageElement
   */
  InfoIconToggle: function InfoIconToggle(e) {
    var hideImage = "/images/InfoHide.png";
    var publicImage = "/images/InfoPublic.png";
    e.src = e.src.includes(publicImage) ? hideImage : publicImage;
  },

  /**
   * 判斷傳入的enum值是否包含特定的列舉項目(僅供enum flag使用)
   * @param {object} targetEnum 欲判定的列舉flags欄位
   * @param {object} checkEnum 特定的列舉項目
   * @return {boolean} true: 有包含特定的列舉項目 / false: 無包含特定列舉項目
   */
  HasFlag: function HasFlag(targetEnum, checkEnum) {
    var result = (targetEnum & checkEnum) === checkEnum;
    return result;
  },

  /**
   * 控制 Img Default Style
   * */
  ControllImgDefaultStyle: function ControllImgDefaultStyle() {
    $('img').each(function () {
      if ($(this).attr('src') !== undefined && $(this).attr('src').includes('default_profilePhoto')) $(this).addClass('index_profilePhotoDefault');else $(this).removeClass('index_profilePhotoDefault');
    });
  },

  /**
   * SVG 元素控制
   * */
  ControllSVG: function ControllSVG() {
    jQuery('img.svg').each(function () {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      var imgClick = $img.attr('onclick');
      jQuery.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg'); // Add replaced image's ID to the new SVG

        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        } // Add replaced image's classes to the new SVG


        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        if (typeof imgClick !== 'undefined') {
          $svg = $svg.attr('onclick', imgClick);
        } // Remove any invalid XML tags as per http://validator.w3.org


        $svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
        } // Replace image with new SVG


        $img.replaceWith($svg);
      }, 'xml');
    });
  }
};
/** SweetAlert 快顯 */

exports.Common = Common;

var Toast = _sweetalert["default"].mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  showClass: {
    popup: 'animate__animated animate__fadeInRight'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutRight'
  },
  timer: 3000,
  timerProgressBar: true,
  didOpen: function didOpen(toast) {
    toast.addEventListener('mouseenter', _sweetalert["default"].stopTimer);
    toast.addEventListener('mouseleave', _sweetalert["default"].resumeTimer);
  },
  showCloseButton: true
});

exports.Toast = Toast;

/**
 * 共用 API 回應狀態 列舉
 * */
var ResponseStatusEnum;
exports.ResponseStatusEnum = ResponseStatusEnum;

(function (ResponseStatusEnum) {
  ResponseStatusEnum[ResponseStatusEnum["Error"] = 0] = "Error";
  ResponseStatusEnum[ResponseStatusEnum["Success"] = 1] = "Success";
})(ResponseStatusEnum || (exports.ResponseStatusEnum = ResponseStatusEnum = {}));
/**
 * 會員公開資訊 列舉
 * */


var MemberPublicInfoEnum;
exports.MemberPublicInfoEnum = MemberPublicInfoEnum;

(function (MemberPublicInfoEnum) {
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u5168\u90E8\u4E0D\u516C\u958B"] = 0] = "\u5168\u90E8\u4E0D\u516C\u958B";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u751F\u65E5"] = 1] = "\u516C\u958B\u751F\u65E5";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u8208\u8DA3"] = 2] = "\u516C\u958B\u8208\u8DA3";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u5DE5\u4F5C"] = 4] = "\u516C\u958B\u5DE5\u4F5C";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u5B78\u6B77"] = 8] = "\u516C\u958B\u5B78\u6B77";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u5168\u90E8\u516C\u958B"] = 15] = "\u5168\u90E8\u516C\u958B";
})(MemberPublicInfoEnum || (exports.MemberPublicInfoEnum = MemberPublicInfoEnum = {}));
/**
 * 會員狀態 列舉
 * */


var MemberStatusEnum;
exports.MemberStatusEnum = MemberStatusEnum;

(function (MemberStatusEnum) {
  MemberStatusEnum[MemberStatusEnum["\u5728\u7DDA"] = 1] = "\u5728\u7DDA";
  MemberStatusEnum[MemberStatusEnum["\u5FD9\u788C"] = 2] = "\u5FD9\u788C";
  MemberStatusEnum[MemberStatusEnum["\u96E2\u7DDA"] = 3] = "\u96E2\u7DDA";
})(MemberStatusEnum || (exports.MemberStatusEnum = MemberStatusEnum = {}));
/**
 * 判斷好友邀請 列舉
 * */


var DecideFriendInvitationEnum;
exports.DecideFriendInvitationEnum = DecideFriendInvitationEnum;

(function (DecideFriendInvitationEnum) {
  DecideFriendInvitationEnum[DecideFriendInvitationEnum["\u62D2\u7D55"] = 0] = "\u62D2\u7D55";
  DecideFriendInvitationEnum[DecideFriendInvitationEnum["\u63A5\u53D7"] = 1] = "\u63A5\u53D7";
})(DecideFriendInvitationEnum || (exports.DecideFriendInvitationEnum = DecideFriendInvitationEnum = {}));
/**
 * 好友狀態 列舉
 * */


var FriendStatusEnum;
exports.FriendStatusEnum = FriendStatusEnum;

(function (FriendStatusEnum) {
  FriendStatusEnum[FriendStatusEnum["\u975E\u597D\u53CB"] = 0] = "\u975E\u597D\u53CB";
  FriendStatusEnum[FriendStatusEnum["\u5DF2\u5BC4\u9001\u597D\u53CB\u9080\u8ACB"] = 1] = "\u5DF2\u5BC4\u9001\u597D\u53CB\u9080\u8ACB";
  FriendStatusEnum[FriendStatusEnum["\u5DF2\u63A5\u6536\u597D\u53CB\u9080\u8ACB"] = 2] = "\u5DF2\u63A5\u6536\u597D\u53CB\u9080\u8ACB";
  FriendStatusEnum[FriendStatusEnum["\u70BA\u597D\u53CB"] = 3] = "\u70BA\u597D\u53CB";
})(FriendStatusEnum || (exports.FriendStatusEnum = FriendStatusEnum = {}));

var Friend = {
  /**
   * 發送好友邀請
   */
  SendFriendInvitation: function SendFriendInvitation(memberID, nickName, successFunc) {
    var model = new Request.CommonMemberViewModel(memberID);
    API.SendFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u5C0D ".concat(nickName, " \n\u767C\u9001\u597D\u53CB\u9080\u8ACB?"));
  },

  /**
   * 判斷好友邀請 (接受 or 拒絕)
   */
  DecideFriendInvitation: function DecideFriendInvitation(memberID, nickName, decide, successFunc) {
    var model = new Request.DecideFriendInvitationReqViewModel(memberID, decide);
    API.DecideFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426".concat(Enum.DecideFriendInvitationEnum[decide], " ").concat(nickName, " \n\u7684\u597D\u53CB\u9080\u8ACB?"));
  },

  /**
   * 收回好友邀請
   */
  RevokeFriendInvitation: function RevokeFriendInvitation(memberID, nickName, successFunc) {
    var model = new Request.CommonMemberViewModel(memberID);
    API.RevokeFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u6536\u56DE ".concat(nickName, " \n\u7684\u597D\u53CB\u9080\u8ACB?"));
  },

  /**
   * 刪除好友
   */
  DeleteFriend: function DeleteFriend(memberID, nickName, successFunc) {
    var model = new Request.CommonMemberViewModel(memberID);
    API.DeleteFriendAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u522A\u9664\u8207 ".concat(nickName, " \n\u7684\u597D\u53CB\u95DC\u4FC2?"));
  }
};
/**
 * 通用的 Member ViewModel
 * */

exports.Friend = Friend;

var CommonMemberViewModel =
/** @class */
function () {
  function CommonMemberViewModel(memberID) {
    this.MemberID = memberID;
  }

  return CommonMemberViewModel;
}();

exports.CommonMemberViewModel = CommonMemberViewModel;

/**
 * 登入 Request ViewModel
 * */
var LoginReqViewModel =
/** @class */
function () {
  function LoginReqViewModel(account, password) {
    this.Account = account;
    this.Password = password;
  }

  return LoginReqViewModel;
}();

exports.LoginReqViewModel = LoginReqViewModel;

/**
 * Google 第三方登入 Request ViewModel
 * */
var GoogleLoginReqViewModel =
/** @class */
function () {
  function GoogleLoginReqViewModel(code) {
    this.Code = code;
  }

  return GoogleLoginReqViewModel;
}();

exports.GoogleLoginReqViewModel = GoogleLoginReqViewModel;

/**
 * 寄送驗證碼 Request ViewModel
 * */
var SendVCodeReqViewModel =
/** @class */
function () {
  function SendVCodeReqViewModel(mail) {
    this.Mail = mail;
  }

  return SendVCodeReqViewModel;
}();

exports.SendVCodeReqViewModel = SendVCodeReqViewModel;

/**
 * 註冊 Request ViewModel
 * */
var SignupReqViewModel =
/** @class */
function () {
  function SignupReqViewModel(nickName, account, password, passwordCheck, mail, vCode) {
    this.NickName = nickName;
    this.Account = account;
    this.Password = password;
    this.PasswordCheck = passwordCheck;
    this.Mail = mail;
    this.VCode = vCode;
  }

  return SignupReqViewModel;
}();

exports.SignupReqViewModel = SignupReqViewModel;

/**
 * 更新會員公開資訊 Request ViewModel
 * */
var UpdateMemberPublicInfoReqViewModel =
/** @class */
function () {
  function UpdateMemberPublicInfoReqViewModel(brithday, interest, job, education, infoStatus) {
    this.Brithday = brithday;
    this.Interest = interest;
    this.Job = job;
    this.Education = education;
    this.InfoStatus = infoStatus;
  }

  return UpdateMemberPublicInfoReqViewModel;
}();

exports.UpdateMemberPublicInfoReqViewModel = UpdateMemberPublicInfoReqViewModel;

/**
 * 重設密碼 Step1 Request ViewModel
 * */
var ResetPasswordReqViewModel =
/** @class */
function () {
  function ResetPasswordReqViewModel(account, mail) {
    this.Account = account;
    this.Mail = mail;
  }

  return ResetPasswordReqViewModel;
}();

exports.ResetPasswordReqViewModel = ResetPasswordReqViewModel;

/**
 * 重設密碼 Step2 Request ViewModel
 * */
var ResetPasswordConfirmReqViewModel =
/** @class */
function () {
  function ResetPasswordConfirmReqViewModel(password, passwordCheck, guid) {
    this.Password = password;
    this.PasswordCheck = passwordCheck;
    this.Guid = guid;
  }

  return ResetPasswordConfirmReqViewModel;
}();

exports.ResetPasswordConfirmReqViewModel = ResetPasswordConfirmReqViewModel;

/**
 * 更新會員狀態 Request ViewModel
 * */
var UpdateMemberStatusReqViewModel =
/** @class */
function () {
  function UpdateMemberStatusReqViewModel(status) {
    this.Status = status;
  }

  return UpdateMemberStatusReqViewModel;
}();

exports.UpdateMemberStatusReqViewModel = UpdateMemberStatusReqViewModel;

/**
 * 密碼變更 Request ViewModel
 * */
var ChangePasswordReqViewModel =
/** @class */
function () {
  function ChangePasswordReqViewModel(oldPassword, newPassword, newPasswordCheck) {
    this.OldPassword = oldPassword;
    this.NewPassword = newPassword;
    this.NewPasswordCheck = newPasswordCheck;
  }

  return ChangePasswordReqViewModel;
}();

exports.ChangePasswordReqViewModel = ChangePasswordReqViewModel;

/**
 * 判斷好友邀請 Request ViewModel
 * */
var DecideFriendInvitationReqViewModel =
/** @class */
function () {
  function DecideFriendInvitationReqViewModel(memberID, decision) {
    this.MemberID = memberID;
    this.Decision = decision;
  }

  return DecideFriendInvitationReqViewModel;
}();

exports.DecideFriendInvitationReqViewModel = DecideFriendInvitationReqViewModel;

/**
 * 共用回應 ViewModel
 * */
var ResponseViewModel =
/** @class */
function () {
  function ResponseViewModel(msg) {
    this.Message = msg;
  }

  return ResponseViewModel;
}();

exports.ResponseViewModel = ResponseViewModel;

/**
 * Google 第三方登入 Response ViewModel
 * */
var GoogleLoginResViewModel =
/** @class */
function () {
  function GoogleLoginResViewModel() {}

  return GoogleLoginResViewModel;
}();

exports.GoogleLoginResViewModel = GoogleLoginResViewModel;

/**
 * 取得會員資訊 Response ViewModel
 * */
var GetMemberInfoResViewModel =
/** @class */
function () {
  function GetMemberInfoResViewModel() {}

  return GetMemberInfoResViewModel;
}();

exports.GetMemberInfoResViewModel = GetMemberInfoResViewModel;

/**
 * 取得好友清單 Response ViewModel
 * 取得好友邀請清單 Response ViewModel
 * 取得您送出的好友邀請清單 Response ViewModel
 * */
var GetFriendListResViewModel =
/** @class */
function () {
  function GetFriendListResViewModel() {}

  return GetFriendListResViewModel;
}();

exports.GetFriendListResViewModel = GetFriendListResViewModel;

/**
 * 取得好友狀態 Response ViewModel
 * */
var GetFriendStatusResViewModel =
/** @class */
function () {
  function GetFriendStatusResViewModel() {}

  return GetFriendStatusResViewModel;
}();

exports.GetFriendStatusResViewModel = GetFriendStatusResViewModel;