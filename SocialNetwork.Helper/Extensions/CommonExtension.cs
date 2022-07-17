namespace SocialNetwork.Helper
{
    /// <summary>
    /// 常用擴充方法
    /// </summary>
    public static class CommonExtension
    {
        /// <summary>
        /// AsSuccessResponse
        /// </summary>
        /// <typeparam name="T">type of data</typeparam>
        /// <param name="message">message</param>
        /// <param name="data">data</param>
        /// <returns>SuccessResponse</returns>
        public static ResponseViewModel<T> AsSuccessResponse<T>(this string message, T data)
        {
            return new ResponseViewModel<T>
            {
                Status = ResponseStatusEnum.Success,
                Message = message,
                Data = data
            };
        }

        /// <summary>
        /// AsFailResponse
        /// </summary>
        /// <typeparam name="T">type of data</typeparam>
        /// <param name="message">message</param>
        /// <param name="data">data</param>
        /// <returns>FailResponse</returns>
        public static ResponseViewModel<T> AsFailResponse<T>(this string message, T data)
        {
            return new ResponseViewModel<T>
            {
                Status = ResponseStatusEnum.Error,
                Message = message,
                Data = data
            };
        }

        /// <summary>
        /// AsSystemFailResponse
        /// </summary>
        /// <typeparam name="T">type of data</typeparam>
        /// <param name="data">data</param>
        /// <returns>SystemFailResponse</returns>
        public static ResponseViewModel<T> AsSystemFailResponse<T>(T data)
        {
            return new ResponseViewModel<T>
            {
                Status = ResponseStatusEnum.Error,
                Message = "伺服器異常",
                Data = data
            };
        }
    }
}