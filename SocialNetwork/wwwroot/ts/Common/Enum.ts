/**
 * 共用 API 回應狀態 列舉 
 * */
enum ResponseStatusEnum {
    Error = 0,
    Success = 1
}

/**
 * 會員公開資訊 列舉
 * */
enum MemberPublicInfoEnum {
    全部不公開 = 0,
    公開生日 = 1,
    公開興趣 = 2,
    公開工作 = 4,
    公開學歷 = 8,
    全部公開 = 公開生日 | 公開興趣 | 公開工作 | 公開學歷
}

/**
 * 會員狀態 列舉
 * */
enum MemberStatusEnum {
    在線 = 1,
    忙碌 = 2,
    離線 = 3
}

/**
 * 判斷好友邀請 列舉
 * */
enum DecideFriendInvitationEnum {
    拒絕 = 0,
    接受 = 1
}

/**
 * 好友狀態 列舉
 * */
enum FriendStatusEnum {
    非好友 = 0,
    已寄送好友邀請 = 1,
    已接收好友邀請 = 2,
    為好友 = 3
}

/**
 * 會員學歷狀態列舉
 * */
enum MemberEducationEnum {
    秘密 = 0,
    無學歷 = 1,
    小學 = 2,
    國中 = 3,
    高中 = 4,
    高職 = 5,
    五專 = 6,
    大學 = 7,
    碩士 = 8,
    博士 = 9
}

/**
 * 貼文類型列舉
 * */
enum PostTypeEnum {

    /** 載入個人、朋友的貼文 */
    首頁,

    /** 只載入個人貼文 */
    個人首頁
}