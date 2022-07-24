using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SocialNetwork.Helper;
using System;
using System.Threading.Tasks;

namespace SocialNetwork
{
    /// <summary>
    /// ValidateModelAttribute 驗證 ViewModel Attribute
    /// </summary>
    public class ValidateModelAttribute : Attribute, IAsyncActionFilter
    {
        /// <summary>
        ///OnActionExecutionAsync
        /// </summary>
        /// <param name="context">ActionExecutingContext</param>
        /// <param name="next">ActionExecutionDelegate</param>
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (context.ModelState.IsValid == false)
            {
                context.Result = new JsonResult(context.ModelState.AsFailResponse());
                return;
            }

            await next();
        }
    }
}