using System;
using System.Collections.Generic;
using System.Text;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// 錯誤例外擴充方法
    /// </summary>
    public static class ExceptionExtension
    {
        /// <summary>
        /// 取得錯誤例外訊息，包含InnerException的訊息
        /// </summary>
        /// <param name="exception">錯誤例外</param>
        /// <returns>錯誤例外訊息字串</returns>
        public static string GetExceptionMessage(this Exception exception)
        {
            List<dynamic> exceptionMessages = new List<dynamic>();

            dynamic GetExceptionMessage(Exception ex)
            {
                return new { Message = ex.Message, Source = ex.Source, TartgetSite = ex.TargetSite?.Name, StackTrace = ex.StackTrace };
            }

            void GetSourceException(Exception ex)
            {
                exceptionMessages.Add(GetExceptionMessage(ex));
                if (ex.InnerException != null)
                {
                    GetSourceException(ex.InnerException);
                }
            }

            GetSourceException(exception);

            return exceptionMessages.ToJson();
        }
    }
}
