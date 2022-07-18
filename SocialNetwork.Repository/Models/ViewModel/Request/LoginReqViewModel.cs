﻿namespace SocialNetwork.Repository
{
    /// <summary>
    /// 登入 Request ViewModel
    /// </summary>
    public class LoginReqViewModel
    {
        /// <summary>
        /// 帳號
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 密碼
        /// </summary>
        public string Password { get; set; }
    }
}