using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

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
        /// <returns>SuccessResponse</returns>
        public static ResponseViewModel AsSuccessResponse(this string message)
        {
            return new ResponseViewModel
            {
                Status = ResponseStatusEnum.Success,
                Message = message
            };
        }

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
        /// <param name="message">message</param>
        /// <returns>FailResponse</returns>
        public static ResponseViewModel AsFailResponse(this string message)
        {
            return new ResponseViewModel
            {
                Status = ResponseStatusEnum.Error,
                Message = message
            };
        }

        /// <summary>
        /// AsSystemFailResponse
        /// </summary>
        /// <returns>SystemFailResponse</returns>
        public static ResponseViewModel AsSystemFailResponse()
        {
            return new ResponseViewModel
            {
                Status = ResponseStatusEnum.Error,
                Message = "伺服器異常"
            };
        }

        /// <summary>
        /// AsFailResponse
        /// </summary>
        /// <param name="modelState">ModelStateDictionary</param>
        /// <returns>FailResponse</returns>
        public static ResponseViewModel AsFailResponse(this ModelStateDictionary modelState)
        {
            return new ResponseViewModel
            {
                Status = ResponseStatusEnum.Error,
                Message = modelState.Keys.SelectMany(key => modelState[key].Errors).Select(x => x.ErrorMessage).FirstOrDefault()
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
    }
}