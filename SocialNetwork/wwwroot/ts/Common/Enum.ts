/**
 * 共用 API 回應狀態列舉 
 * */
enum ResponseStatusEnum {
    Error = 0,
    Success = 1
}

/**
 * 會員公開資訊列舉
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
 * 會員狀態
 * */
enum MemberStatusEnum {
    在線 = 1,
    忙碌 = 2,
    離線 = 3
}