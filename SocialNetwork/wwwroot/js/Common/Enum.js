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
