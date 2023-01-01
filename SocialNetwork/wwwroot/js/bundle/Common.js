"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
/**
 * 封裝基礎 Http
 * @param loadingMsg Loading 顯示文字
 * @param api api 路徑
 * @param successFunc 回應成功 Func
 * @param errorFunc 回應失敗 Func
 * @param isNotification 是否快顯通知
 * @param isShowSuccessMsg 是否顯示回應成功訊息
 */


function BaseGetAPI(loadingMsg, api, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
  if (isNotification === void 0) {
    isNotification = false;
  }

  if (isShowSuccessMsg === void 0) {
    isShowSuccessMsg = true;
  }

  return new Promise(function (resolve, reject) {
    if (loadingMsg) Common.SweetAlertLoading(loadingMsg);
    $.ajax({
      method: "Get",
      url: api,
      success: function success(res) {
        if (res.Status == ResponseStatusEnum.Success) {
          if (isShowSuccessMsg) {
            if (isNotification) Common.SweetAlertNotification(true, res.Message);else Common.SweetAlertSuccess(res, successFunc);
          } else Swal.close();

          resolve(res.Data);
        } else {
          if (isNotification) Common.SweetAlertNotification(false, res.Message);else Common.SweetAlertError(res, errorFunc);
        }

        reject('error');
      },
      error: function error(e) {
        console.log(e);
        Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
        reject(e);
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


function BasePostAPIV1(loadingMsg, api, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
  if (isNotification === void 0) {
    isNotification = false;
  }

  if (isShowSuccessMsg === void 0) {
    isShowSuccessMsg = true;
  }

  return new Promise(function (resolve, reject) {
    if (loadingMsg) Common.SweetAlertLoading(loadingMsg);
    $.ajax({
      method: "POST",
      url: api,
      headers: {
        "RequestVerificationToken": $("#RequestVerificationToken").val()
      },
      async: false,
      success: function success(res) {
        if (res.Status == ResponseStatusEnum.Success) {
          if (isShowSuccessMsg) {
            if (isNotification) Common.SweetAlertNotification(true, res.Message);else Common.SweetAlertSuccess(res, successFunc);
          } else Swal.close();

          resolve(res.Data);
        } else {
          if (isNotification) Common.SweetAlertNotification(false, res.Message);else Common.SweetAlertError(res, errorFunc);
          reject('error');
        }
      },
      error: function error(e) {
        console.log(e);
        Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
        reject(e);
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


function BasePostAPIV2(loadingMsg, api, model, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
  if (isNotification === void 0) {
    isNotification = false;
  }

  if (isShowSuccessMsg === void 0) {
    isShowSuccessMsg = true;
  }

  return new Promise(function (resolve, reject) {
    if (loadingMsg) Common.SweetAlertLoading(loadingMsg);
    $.ajax({
      method: "POST",
      url: api,
      headers: {
        "RequestVerificationToken": $("#RequestVerificationToken").val()
      },
      data: JSON.stringify(model),
      dataType: "json",
      contentType: "application/json",
      async: false,
      success: function success(res) {
        if (res.Status == ResponseStatusEnum.Success) {
          if (isShowSuccessMsg) {
            if (isNotification) Common.SweetAlertNotification(true, res.Message);else Common.SweetAlertSuccess(res, successFunc);
          } else Swal.close();

          resolve(res.Data);
        } else {
          if (isNotification) Common.SweetAlertNotification(false, res.Message);else Common.SweetAlertError(res, errorFunc);
          reject('error');
        }
      },
      error: function error(e) {
        console.log(e);
        Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
        reject(e);
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


function BasePostAPIV3(loadingMsg, api, model, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
  if (isNotification === void 0) {
    isNotification = false;
  }

  if (isShowSuccessMsg === void 0) {
    isShowSuccessMsg = true;
  }

  if (loadingMsg) Common.SweetAlertLoading(loadingMsg);
  $.ajax({
    method: "POST",
    url: api,
    headers: {
      "RequestVerificationToken": $("#RequestVerificationToken").val()
    },
    data: JSON.stringify(model),
    dataType: "json",
    contentType: "application/json",
    success: function success(res) {
      if (res.Status == ResponseStatusEnum.Success) {
        if (isShowSuccessMsg) {
          if (isNotification) Common.SweetAlertNotification(true, res.Message);else Common.SweetAlertSuccess(res, successFunc);
        } else Swal.close();
      } else {
        if (isNotification) Common.SweetAlertNotification(false, res.Message);else Common.SweetAlertError(res, errorFunc);
      }
    },
    error: function error(e) {
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


function BasePostAPIByFormData(loadingMsg, api, formData, successFunc, errorFunc, isNotification, isShowSuccessMsg) {
  if (isNotification === void 0) {
    isNotification = false;
  }

  if (isShowSuccessMsg === void 0) {
    isShowSuccessMsg = true;
  }

  if (loadingMsg) Common.SweetAlertLoading(loadingMsg);
  $.ajax({
    method: "POST",
    url: api,
    headers: {
      "RequestVerificationToken": $("#RequestVerificationToken").val()
    },
    data: formData,
    dataType: "json",
    processData: false,
    contentType: false,
    success: function success(res) {
      if (res.Status == ResponseStatusEnum.Success) {
        if (isShowSuccessMsg) {
          if (isNotification) Common.SweetAlertNotification(true, res.Message);else Common.SweetAlertSuccess(res, successFunc);
        } else Swal.close();
      } else {
        if (isNotification) Common.SweetAlertNotification(false, res.Message);else Common.SweetAlertError(res, errorFunc);
      }
    },
    error: function error(e) {
      console.log(e);
      Common.SweetAlertErrorMsg("伺服器異常", errorFunc);
    }
  });
}
/**
 * 登入 API
 */


function LoginAPI(loadingMsg, model, successFunc, errorFunc) {
  BasePostAPIV3(loadingMsg, "/MemberApi/Login", model, successFunc, errorFunc);
}
/**
 * Google 第三方登入 API
 */


function GoogleLoginAPI(loadingMsg, model, successFunc, errorFunc) {
  BasePostAPIV3(loadingMsg, "/MemberApi/GoogleLogin", model, successFunc, errorFunc);
}
/**
 * 寄送驗證碼 API
 */


function SendVCodeAPI(loadingMsg, model, successFunc, errorFunc) {
  BasePostAPIV3(loadingMsg, "/MemberApi/SendVCode", model, successFunc, errorFunc);
}
/**
 * 註冊 API
 */


function SignupAPI(loadingMsg, model, successFunc, errorFunc) {
  BasePostAPIV3(loadingMsg, "/MemberApi/Signup", model, successFunc, errorFunc);
}
/**
 * 更新會員公開資訊 API
 */


function UpdateMemberPublicInfoAPI(loadingMsg, model, successFunc, errorFunc) {
  BasePostAPIV3(loadingMsg, "/MemberApi/UpdateMemberPublicInfo", model, successFunc, errorFunc);
}
/**
 * 重設密碼 Step1 API
 * 申請重設密碼、建立重設密碼URL
 */


function ResetPasswordAPI(loadingMsg, model) {
  var successFunc = function successFunc() {};

  var errorFunc = function errorFunc() {};

  BasePostAPIV3(loadingMsg, "/MemberApi/ResetPassword", model, successFunc, errorFunc);
}
/**
 * 重設密碼 Step2 API
 */


function ResetPasswordConfirmAPI(loadingMsg, model, successFunc, errorFunc) {
  BasePostAPIV3(loadingMsg, "/MemberApi/ResetPasswordConfirm", model, successFunc, errorFunc);
}
/**
 * 登出 API
 */


function LogoutAPI(loadingMsg, successFunc, errorFunc, confirmTitle) {
  Common.SweetAlertConfirm(confirmTitle, function () {
    return BaseGetAPI(loadingMsg, "/MemberApi/Logout", successFunc, errorFunc);
  });
}
/**
 * 更新會員狀態 API
 */


function UpdateMemberStatusAPI(model) {
  var successFunc = function successFunc() {};

  var errorFunc = function errorFunc() {};

  var isNotification = true;
  var isShowSuccessMsg = true;
  BasePostAPIV3('', "/MemberApi/UpdateMemberStatus", model, successFunc, errorFunc, isNotification, isShowSuccessMsg);
}
/**
 * 取得當前會員資訊 API
 */


function GetCurrentMemberInfoAPI() {
  return __awaiter(this, void 0, void 0, function () {
    var successFunc, errorFunc, isNotification, isShowSuccessMsg;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          successFunc = function successFunc() {};

          errorFunc = function errorFunc() {};

          isNotification = false;
          isShowSuccessMsg = false;
          return [4
          /*yield*/
          , BaseGetAPI('', "/MemberApi/GetCurrentMemberInfo", successFunc, errorFunc, isNotification, isShowSuccessMsg)];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
}
/**
 * 取得會員資訊 API
 */


function GetMemberInfoAPI(memberID) {
  return __awaiter(this, void 0, void 0, function () {
    var successFunc, errorFunc, isNotification, isShowSuccessMsg;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          successFunc = function successFunc() {};

          errorFunc = function errorFunc() {};

          isNotification = false;
          isShowSuccessMsg = false;
          return [4
          /*yield*/
          , BaseGetAPI('', "/MemberApi/GetMemberInfo/".concat(memberID), successFunc, errorFunc, isNotification, isShowSuccessMsg)];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
}
/**
 * 更新會員資訊 API
 */


function UpdateMemberInfoAPI(loadingMsg, formData, successFunc, errorFunc, confirmTitle) {
  Common.SweetAlertConfirm(confirmTitle, function () {
    return BasePostAPIByFormData(loadingMsg, "/MemberApi/UpdateMemberInfo", formData, successFunc, errorFunc);
  });
}
/**
 * 密碼變更 API
 */


function ChangePasswordAPI(loadingMsg, model, successFunc, errorFunc, confirmTitle) {
  Common.SweetAlertConfirm(confirmTitle, function () {
    return BasePostAPIV3(loadingMsg, "/MemberApi/ChangePassword", model, successFunc, errorFunc);
  });
} // Post

/**
 * 發佈貼文 API
 */


function PublishPostAPI(loadingMsg, formData, successFunc, errorFunc, confirmTitle) {
  Common.SweetAlertConfirm(confirmTitle, function () {
    return BasePostAPIByFormData(loadingMsg, "/PostApi/PublishPost", formData, successFunc, errorFunc);
  });
}
/**
 * 取得貼文 (自己和朋友) API
 */


function GetHomeIndexPostAPI(model) {
  return __awaiter(this, void 0, void 0, function () {
    var successFunc, errorFunc, isNotification, isShowSuccessMsg;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          successFunc = function successFunc() {};

          errorFunc = function errorFunc() {};

          isNotification = false;
          isShowSuccessMsg = false;
          return [4
          /*yield*/
          , BasePostAPIV2('', "/PostApi/GetHomeIndexPost", model, successFunc, errorFunc, isNotification, isShowSuccessMsg)];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
}
/**
 * 取得會員貼文 API
 */


function GetMemberPostAPI(model) {
  return __awaiter(this, void 0, void 0, function () {
    var successFunc, errorFunc, isNotification, isShowSuccessMsg;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          successFunc = function successFunc() {};

          errorFunc = function errorFunc() {};

          isNotification = false;
          isShowSuccessMsg = false;
          return [4
          /*yield*/
          , BasePostAPIV2('', "/PostApi/GetMemberPost", model, successFunc, errorFunc, isNotification, isShowSuccessMsg)];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
} // Friend

/**
 * 取得好友清單 API
 */


function GetFriendListAPI() {
  return __awaiter(this, void 0, void 0, function () {
    var successFunc, errorFunc, isNotification, isShowSuccessMsg;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          successFunc = function successFunc() {};

          errorFunc = function errorFunc() {};

          isNotification = false;
          isShowSuccessMsg = false;
          return [4
          /*yield*/
          , BasePostAPIV1('', "/FriendApi/GetFriendList", successFunc, errorFunc, isNotification, isShowSuccessMsg)];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
}
/**
 * 取得好友邀請清單 API
 */


function GetFriendInvitationListAPI() {
  return __awaiter(this, void 0, void 0, function () {
    var successFunc, errorFunc, isNotification, isShowSuccessMsg;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          successFunc = function successFunc() {};

          errorFunc = function errorFunc() {};

          isNotification = false;
          isShowSuccessMsg = false;
          return [4
          /*yield*/
          , BasePostAPIV1('', "/FriendApi/GetFriendInvitationList", successFunc, errorFunc, isNotification, isShowSuccessMsg)];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
}
/**
 * 取得您送出的好友邀請清單 API
 */


function GetSendFriendInvitationListAPI() {
  return __awaiter(this, void 0, void 0, function () {
    var successFunc, errorFunc, isNotification, isShowSuccessMsg;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          successFunc = function successFunc() {};

          errorFunc = function errorFunc() {};

          isNotification = false;
          isShowSuccessMsg = false;
          return [4
          /*yield*/
          , BasePostAPIV1('', "/FriendApi/GetSendFriendInvitationList", successFunc, errorFunc, isNotification, isShowSuccessMsg)];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
}
/**
 * 取得好友狀態 API
 */


function GetFriendStatusAPI(model) {
  return __awaiter(this, void 0, void 0, function () {
    var successFunc, errorFunc, isNotification, isShowSuccessMsg;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          successFunc = function successFunc() {};

          errorFunc = function errorFunc() {};

          isNotification = false;
          isShowSuccessMsg = false;
          return [4
          /*yield*/
          , BasePostAPIV2('', "/FriendApi/GetFriendStatus", model, successFunc, errorFunc, isNotification, isShowSuccessMsg)];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
}
/**
 * 發送好友邀請 API
 */


function SendFriendInvitationAPI(model, successFunc, confirmTitle) {
  var errorFunc = function errorFunc() {};

  Common.SweetAlertConfirm(confirmTitle, function () {
    return BasePostAPIV3('', "/FriendApi/SendFriendInvitation", model, successFunc, errorFunc);
  });
}
/**
 * 判斷好友邀請 (接受 or 拒絕) API
 */


function DecideFriendInvitationAPI(model, successFunc, confirmTitle) {
  var errorFunc = function errorFunc() {};

  Common.SweetAlertConfirm(confirmTitle, function () {
    return BasePostAPIV3('', "/FriendApi/DecideFriendInvitation", model, successFunc, errorFunc);
  });
}
/**
 * 收回好友邀請 API
 */


function RevokeFriendInvitationAPI(model, successFunc, confirmTitle) {
  var errorFunc = function errorFunc() {};

  Common.SweetAlertConfirm(confirmTitle, function () {
    return BasePostAPIV3('', "/FriendApi/RevokeFriendInvitation", model, successFunc, errorFunc);
  });
}
/**
 * 刪除好友 API
 */


function DeleteFriendAPI(model, successFunc, confirmTitle) {
  var errorFunc = function errorFunc() {};

  Common.SweetAlertConfirm(confirmTitle, function () {
    return BasePostAPIV3('', "/FriendApi/DeleteFriend", model, successFunc, errorFunc);
  });
}

var ChatHubConnection =
/** @class */
function () {
  function ChatHubConnection() {
    this.Connection = new signalR.HubConnectionBuilder().withUrl("/chatHub") //.withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
    .configureLogging(signalR.LogLevel.Information).build();
  }

  ChatHubConnection.prototype.connect = function (ReflashFriendStatusFunc) {
    // Register
    this.Connection.on("ReflashFriendStatus_Receive", function (friend) {
      ReflashFriendStatusFunc(friend);
    });
    this.Connection.start().then(function () {})["catch"](function (err) {
      console.error(err.toString());
      console.log("ChatHubConnection closed.");
      Common.SweetAlertErrorMsg("ChatHubConnection error: ".concat(err.message));
    });
  };

  return ChatHubConnection;
}();

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
      Swal.fire({
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
      Swal.fire({
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
      Swal.fire({
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
      Swal.fire({
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
      Swal.fire({
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
      Swal.fire({
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
    Swal.fire({
      title: msg,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: function didOpen() {
        Swal.showLoading();
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
    Swal.fire({
      html: "<b></b> \u79D2\u5F8C \u8DF3\u8F49\u56DE".concat(pathName),
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: function didOpen() {
        Swal.showLoading();
        var b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(function () {
          b.textContent = Math.round(Swal.getTimerLeft() / 1000).toString();
        }, 100);
      },
      willClose: function willClose() {
        clearInterval(timerInterval);
      }
    }).then(function (result) {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
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

    Swal.fire({
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
   * Date 轉換 => yyyy-MM-dd HH:mm:ss
   * @param date
   */
  DateFormat: function DateFormat(date) {
    return new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
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

var Toast = Swal.mixin({
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
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  showCloseButton: true
});
/**
 * 共用 API 回應狀態 列舉
 * */

var ResponseStatusEnum;

(function (ResponseStatusEnum) {
  ResponseStatusEnum[ResponseStatusEnum["Error"] = 0] = "Error";
  ResponseStatusEnum[ResponseStatusEnum["Success"] = 1] = "Success";
})(ResponseStatusEnum || (ResponseStatusEnum = {}));
/**
 * 會員公開資訊 列舉
 * */


var MemberPublicInfoEnum;

(function (MemberPublicInfoEnum) {
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u5168\u90E8\u4E0D\u516C\u958B"] = 0] = "\u5168\u90E8\u4E0D\u516C\u958B";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u751F\u65E5"] = 1] = "\u516C\u958B\u751F\u65E5";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u8208\u8DA3"] = 2] = "\u516C\u958B\u8208\u8DA3";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u5DE5\u4F5C"] = 4] = "\u516C\u958B\u5DE5\u4F5C";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u516C\u958B\u5B78\u6B77"] = 8] = "\u516C\u958B\u5B78\u6B77";
  MemberPublicInfoEnum[MemberPublicInfoEnum["\u5168\u90E8\u516C\u958B"] = 15] = "\u5168\u90E8\u516C\u958B";
})(MemberPublicInfoEnum || (MemberPublicInfoEnum = {}));
/**
 * 會員狀態 列舉
 * */


var MemberStatusEnum;

(function (MemberStatusEnum) {
  MemberStatusEnum[MemberStatusEnum["\u5728\u7DDA"] = 1] = "\u5728\u7DDA";
  MemberStatusEnum[MemberStatusEnum["\u5FD9\u788C"] = 2] = "\u5FD9\u788C";
  MemberStatusEnum[MemberStatusEnum["\u96E2\u7DDA"] = 3] = "\u96E2\u7DDA";
})(MemberStatusEnum || (MemberStatusEnum = {}));
/**
 * 判斷好友邀請 列舉
 * */


var DecideFriendInvitationEnum;

(function (DecideFriendInvitationEnum) {
  DecideFriendInvitationEnum[DecideFriendInvitationEnum["\u62D2\u7D55"] = 0] = "\u62D2\u7D55";
  DecideFriendInvitationEnum[DecideFriendInvitationEnum["\u63A5\u53D7"] = 1] = "\u63A5\u53D7";
})(DecideFriendInvitationEnum || (DecideFriendInvitationEnum = {}));
/**
 * 好友狀態 列舉
 * */


var FriendStatusEnum;

(function (FriendStatusEnum) {
  FriendStatusEnum[FriendStatusEnum["\u975E\u597D\u53CB"] = 0] = "\u975E\u597D\u53CB";
  FriendStatusEnum[FriendStatusEnum["\u5DF2\u5BC4\u9001\u597D\u53CB\u9080\u8ACB"] = 1] = "\u5DF2\u5BC4\u9001\u597D\u53CB\u9080\u8ACB";
  FriendStatusEnum[FriendStatusEnum["\u5DF2\u63A5\u6536\u597D\u53CB\u9080\u8ACB"] = 2] = "\u5DF2\u63A5\u6536\u597D\u53CB\u9080\u8ACB";
  FriendStatusEnum[FriendStatusEnum["\u70BA\u597D\u53CB"] = 3] = "\u70BA\u597D\u53CB";
})(FriendStatusEnum || (FriendStatusEnum = {}));
/**
 * 會員學歷狀態列舉
 * */


var MemberEducationEnum;

(function (MemberEducationEnum) {
  MemberEducationEnum[MemberEducationEnum["\u7121\u53EF\u5949\u544A"] = 0] = "\u7121\u53EF\u5949\u544A";
  MemberEducationEnum[MemberEducationEnum["\u7121\u5B78\u6B77"] = 1] = "\u7121\u5B78\u6B77";
  MemberEducationEnum[MemberEducationEnum["\u5C0F\u5B78"] = 2] = "\u5C0F\u5B78";
  MemberEducationEnum[MemberEducationEnum["\u570B\u4E2D"] = 3] = "\u570B\u4E2D";
  MemberEducationEnum[MemberEducationEnum["\u9AD8\u4E2D"] = 4] = "\u9AD8\u4E2D";
  MemberEducationEnum[MemberEducationEnum["\u9AD8\u8077"] = 5] = "\u9AD8\u8077";
  MemberEducationEnum[MemberEducationEnum["\u4E94\u5C08"] = 6] = "\u4E94\u5C08";
  MemberEducationEnum[MemberEducationEnum["\u5927\u5B78"] = 7] = "\u5927\u5B78";
  MemberEducationEnum[MemberEducationEnum["\u78A9\u58EB"] = 8] = "\u78A9\u58EB";
  MemberEducationEnum[MemberEducationEnum["\u535A\u58EB"] = 9] = "\u535A\u58EB";
})(MemberEducationEnum || (MemberEducationEnum = {}));

var Friend = {
  /**
   * 發送好友邀請
   */
  SendFriendInvitation: function SendFriendInvitation(memberID, nickName, successFunc) {
    var model = new CommonMemberViewModel(memberID);
    SendFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u5C0D ".concat(nickName, " \n\u767C\u9001\u597D\u53CB\u9080\u8ACB?"));
  },

  /**
   * 判斷好友邀請 (接受 or 拒絕)
   */
  DecideFriendInvitation: function DecideFriendInvitation(memberID, nickName, decide, successFunc) {
    var model = new DecideFriendInvitationReqViewModel(memberID, decide);
    DecideFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426".concat(DecideFriendInvitationEnum[decide], " ").concat(nickName, " \n\u7684\u597D\u53CB\u9080\u8ACB?"));
  },

  /**
   * 收回好友邀請
   */
  RevokeFriendInvitation: function RevokeFriendInvitation(memberID, nickName, successFunc) {
    var model = new CommonMemberViewModel(memberID);
    RevokeFriendInvitationAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u6536\u56DE ".concat(nickName, " \n\u7684\u597D\u53CB\u9080\u8ACB?"));
  },

  /**
   * 刪除好友
   */
  DeleteFriend: function DeleteFriend(memberID, nickName, successFunc) {
    var model = new CommonMemberViewModel(memberID);
    DeleteFriendAPI(model, successFunc, "\u78BA\u5B9A\u662F\u5426\u522A\u9664\u8207 ".concat(nickName, " \n\u7684\u597D\u53CB\u95DC\u4FC2?"));
  }
};
var tempSelectPostKey = 0;
var Post = {
  Init: function Init() {//$(".postAction").on("focus", function (event) {
    //    debugger
    //    $(this).children('.ul_postAction').show();
    //});
    //$(".postAction").blur(function (event) {
    //    debugger
    //    $(this).children('.ul_postAction').hide();
    //});
  },

  /**
   * 貼文 Html Template
   */
  PostHtmlTemplate: function PostHtmlTemplate(model) {
    return "\n<div class=\"div_post\" PostKey=\"".concat(model.PostKey, "\" MemberID=\"").concat(model.MemberID, "\">\n    <div class=\"div_post_content\">\n        <div class=\"post_content_topBar\">\n            <div class=\"postPhoto_container\">\n                <img class=\"postPhoto\" src=\"").concat(model.ProfilePhotoUrl, "\">\n            </div>\n            <div class=\"postProfile\">\n                <div>").concat(model.NickName, "</div>\n                <span class=\"time\"title=\"").concat(Common.DateFormat(model.PostDateTime.toString()), "\">").concat(Post.PostDateTimeFilter(model.PostDateTime.toString()), "</span>\n            </div>\n            <div class=\"postAction\" tabindex=\"-1\" PostKey=\"").concat(model.PostKey, "\" onclick=\"Post.TogglePostAction(this)\">\u22EE\n            <ul class=\"ul_postAction\" PostKey=\"").concat(model.PostKey, "\">\n                <li><a PostKey=\"").concat(model.PostKey, "\">\u522A\u9664</a></li>\n                <li><a PostKey=\"").concat(model.PostKey, "\">\u7DE8\u8F2F</a></li>\n            </ul>\n            </div>\n        </div>\n        <div class=\"post_body\">\n            ").concat(model.PostContent, "\n            <div id=\"wrapper\">\n                <ul class=\"example\">\n                    ").concat(Post.PostImageHtmlTemplate(model.PostImageUrlList), "\n                </ul>\n            </div>\n        </div>\n        <div class=\"post_footerBar\">\n            <div class=\"post_footer_container\">\n                <div class=\"post_footer_img\">\n                    <img class=\"postLike\" src=\"/images/post/thumb_up_black_24dp.svg\" />\n                </div>\n                <span class=\"post_footer_number\">").concat(model.GoodQuantity, "</span>\n            </div>\n            <div class=\"post_footer_container\">\n                <div class=\"post_footer_img\">\n                    <img class=\"postMsg\" src=\"/images/post/textsms_black_24dp.svg\" />\n                </div>\n                <span class=\"post_footer_number\">").concat(model.TotalPostMsgCount, "</span>\n            </div>\n            <div class=\"post_footer_container\">\n                <img class=\"postShare\" src=\"/images/post/share_black_24dp.svg\" />\n            </div>\n        </div>\n    </div>\n    <div class=\"div_post_msg_send\">\n        <div class=\"post_msgPhoto_container\">\n            <img class=\"post_msgPhoto\" src=\"").concat(model.ProfilePhotoUrl, "\">\n        </div>\n        <div class=\"post_msg_comment\">\n            <textarea class=\"msgComment\" placeholder=\"\u7559\u8A00...\"></textarea>\n        </div>\n        <div class=\"post_msg_submit\">\n            <img class=\"msgSend\" src=\"/images/post/send_black_24dp.svg\">\n        </div>\n    </div>\n\n    ").concat(Post.ShowPostMsg(model.PostKey, model.PostMsgList, model.TotalPostMsgCount), "\n</div>\n  ");
  },

  /**
   * 貼文圖片 Html Template
   * @param PostMsgList
   */
  PostImageHtmlTemplate: function PostImageHtmlTemplate(postImageUrlList) {
    var html = '';
    if (postImageUrlList.length == 0) return html;
    postImageUrlList.forEach(function (f) {
      html += "\n            <li data-src=\"".concat(f, "\" data-thumb=\"").concat(f, "\">\n                <img src=\"").concat(f, "\" style=\"max-height: 100%; max-width: 100%;\"/>\n            </li>");
    });
    return html;
  },

  /**
   * 貼文留言顯示
   * @param PostMsgList
   */
  ShowPostMsg: function ShowPostMsg(postKey, postMsgList, totalPostMsgCount) {
    var html = '';
    postMsgList.slice(0, 3).forEach(function (f) {
      html += Post.PostMsgHtmlTemplate(f);
    });
    if (totalPostMsgCount > 3) html += "\n            <div class=\"div_post_moreMsg\" PostKey=\"".concat(postKey, "\">\n                <div class=\"container_moreMsg\">\n                    <img class=\"moreMsg\" src=\"/images/more_msg.svg\" />\n                        <span>\u67E5\u770B\u5176\u5B83\u7559\u8A00</span>\n                    <img class=\"moreMsg\" src=\"/images/more_msg.svg\" />\n                </div>\n            </div>\n");
    return html;
  },

  /**
   * 貼文留言 Html Template
   */
  PostMsgHtmlTemplate: function PostMsgHtmlTemplate(model) {
    return "\n    <div class=\"div_post_msg\" MsgKey=\"".concat(model.MsgKey, " MemberID=\"").concat(model.MemberID, "\">\n        <div class=\"post_msgPhoto_container\">\n            <img class=\"post_msgPhoto\" src=\"").concat(model.ProfilePhotoUrl, "\">\n        </div>\n        <div class=\"postMsgProfile\">\n            <div>\n                <span>").concat(model.NickName, "</span>\n                <span class=\"msgContent\" style=\"margin-left:5px;\"> ").concat(model.MsgContent, "</span>\n            </div>\n            <span class=\"time\" title=\"").concat(Common.DateFormat(model.PostMsgDateTime.toString()), "\">").concat(Post.PostDateTimeFilter(model.PostMsgDateTime.toString()), "</span>\n        </div>\n    </div>\n  ");
  },

  /**
   * 貼文選項開關
   * @param e HTMLSpanElement
   */
  TogglePostAction: function TogglePostAction(e) {
    tempSelectPostKey = parseInt($(e).attr('postkey'));
    $(e).children('ul').toggle();
  },

  /**
   * Source Code 參考
   * https://www.cnblogs.com/miangao/p/13229050.html
   *
   * 發布時間轉換字串顯示
   * 改寫成
   * ● 當天(24小時內)顯示"XX秒/分鐘/小時前"。
   * ● 前一天(48小時內)顯示"昨天 XX:XX"。
   * ● 前兩天(72小時內)顯示"前天 XX:XX"。
   * ● 72小時以上顯示年月日，範例：2021/06/04。
   * @param postDateTimeStr 發布時間
   */
  PostDateTimeFilter: function PostDateTimeFilter(postDateTimeStr) {
    var postDateTime = new Date(postDateTimeStr);
    var publishTime = postDateTime.getTime() / 1000,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = new Date().getTime() / 1000,
        d,
        Y = postDateTime.getFullYear(),
        M = (postDateTime.getMonth() + 1).toString().padStart(2, '0'),
        D = postDateTime.getDate().toString().padStart(2, '0'),
        H = postDateTime.getHours().toString().padStart(2, '0'),
        m = postDateTime.getMinutes().toString().padStart(2, '0'),
        s = postDateTime.getSeconds().toString().padStart(2, '0');
    d = timeNow - publishTime;
    d_days = Math.floor(d / 86400);
    d_hours = Math.floor(d / 3600);
    d_minutes = Math.floor(d / 60);
    d_seconds = Math.floor(d);

    if (d_hours >= 72) {
      return "".concat(Y, "/").concat(M, "/").concat(D);
    } else if (d_hours < 72 && d_hours >= 48) {
      return "\u524D\u5929 ".concat(H, ":").concat(m);
    } else if (d_hours < 48 && d_hours >= 24) {
      return "\u6628\u5929 ".concat(H, ":").concat(m);
    } else if (d_hours < 24 && d_minutes >= 60) {
      return "".concat(d_hours, "\u5C0F\u6642\u524D");
    } else if (d_minutes < 60 && d_seconds >= 60) {
      return "".concat(d_minutes, "\u5206\u9418\u524D");
    } else {
      return "".concat(d_seconds, "\u79D2\u524D");
    }
  }
};
/**
 * 通用的 Member ViewModel
 * */

var CommonMemberViewModel =
/** @class */
function () {
  function CommonMemberViewModel(memberID) {
    this.MemberID = memberID;
  }

  return CommonMemberViewModel;
}();
/**
 * 查詢資料筆數 Member ViewModel
 * */


var QueryRowMemberReqViewModel =
/** @class */
function () {
  function QueryRowMemberReqViewModel(memberID, queryRowNo) {
    this.MemberID = memberID;
    this.QueryRowNo = queryRowNo;
  }

  return QueryRowMemberReqViewModel;
}();
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
/**
 * Google 第三方登入 Response ViewModel
 * */


var GoogleLoginResViewModel =
/** @class */
function () {
  function GoogleLoginResViewModel() {}

  return GoogleLoginResViewModel;
}();
/**
 * 取得會員資訊 Response ViewModel
 * */


var GetMemberInfoResViewModel =
/** @class */
function () {
  function GetMemberInfoResViewModel() {}

  return GetMemberInfoResViewModel;
}();
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
/**
 * 取得好友狀態 Response ViewModel
 * */


var GetFriendStatusResViewModel =
/** @class */
function () {
  function GetFriendStatusResViewModel() {}

  return GetFriendStatusResViewModel;
}();
/**
 * 取得貼文 Response ViewModel
 * 取得會員貼文 Response ViewModel
 * */


var GetPostResViewModel =
/** @class */
function () {
  function GetPostResViewModel() {}

  return GetPostResViewModel;
}();
/**
 * 貼文留言 Response ViewModel
 * */


var GetPostMsgResViewModel =
/** @class */
function () {
  function GetPostMsgResViewModel() {}

  return GetPostMsgResViewModel;
}();

var User =
/** @class */
function () {
  function User() {}

  User.prototype.Init = function (user) {
    this.MemberID = user.MemberID;
    this.Account = user.Account;
    this.NickName = user.NickName;
    this.ProfilePhotoUrl = user.ProfilePhotoUrl;
    this.Status = user.Status;
    var oAuthList = ["google"];
    this.IsOriginalMember = oAuthList.every(function (a) {
      return a != user.Account.split('@').pop();
    });
    return this;
  };

  return User;
}();