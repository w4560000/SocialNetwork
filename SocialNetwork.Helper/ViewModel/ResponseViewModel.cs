namespace SocialNetwork.Helper
{

    /// <summary>
    /// 共用回應 ViewModel
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ResponseViewModel<T>
    {
        /// <summary>
        /// 回應狀態
        /// </summary>
        public ResponseStatusEnum Status { get; set; }

        /// <summary>
        /// 回應訊息
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// 回應資料
        /// </summary>
        public T Data { get; set; }
    }
}