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
    MemberEducationEnum[MemberEducationEnum["\u79D8\u5BC6"] = 0] = "\u79D8\u5BC6";
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
/**
 * 貼文類型列舉
 * */
var PostTypeEnum;
(function (PostTypeEnum) {
    /** 載入個人、朋友的貼文 */
    PostTypeEnum[PostTypeEnum["\u9996\u9801"] = 0] = "\u9996\u9801";
    /** 只載入個人貼文 */
    PostTypeEnum[PostTypeEnum["\u500B\u4EBA\u9996\u9801"] = 1] = "\u500B\u4EBA\u9996\u9801";
})(PostTypeEnum || (PostTypeEnum = {}));
