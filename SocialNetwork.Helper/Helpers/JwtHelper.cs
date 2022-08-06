﻿using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// JwtHelper
    /// </summary>
    public class JwtHelper
    {
        /// <summary>
        /// IConfiguration
        /// </summary>
        private readonly IConfiguration Configuration;

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="configuration">IConfiguration</param>
        public JwtHelper(
            IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        /// <summary>
        /// 建立 JwtToken
        /// </summary>
        /// <param name="userInfo">會員資訊</param>
        /// <param name="expireMinutes">過期時間(分)</param>
        /// <returns>JwtToken</returns>
        public string GenerateToken(UserInfo userInfo, int expireMinutes = 30)
        {
            var issuer = Configuration.GetValue<string>("JwtSettings:Issuer");
            var signKey = Configuration.GetValue<string>("JwtSettings:SignKey");

            // 設定要加入到 JWT Token 中的聲明資訊(Claims)
            var claims = new List<Claim>();

            // 在 RFC 7519 規格中(Section#4)，總共定義了 7 個預設的 Claims，我們應該只用的到兩種！
            //claims.Add(new Claim(JwtRegisteredClaimNames.Iss, issuer));
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, userInfo.NickName)); // User.Identity.Name
            //claims.Add(new Claim(JwtRegisteredClaimNames.Aud, "The Audience"));
            //claims.Add(new Claim(JwtRegisteredClaimNames.Exp, DateTimeOffset.UtcNow.AddMinutes(30).ToUnixTimeSeconds().ToString()));
            //claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString())); // 必須為數字
            //claims.Add(new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString())); // 必須為數字
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())); // JWT ID

            // 自定義
            claims.Add(new Claim(nameof(UserInfo.MemberID), userInfo.MemberID.ToString()));
            claims.Add(new Claim(nameof(UserInfo.Account), userInfo.Account));
            claims.Add(new Claim(nameof(UserInfo.NickName), userInfo.NickName));
            claims.Add(new Claim(nameof(UserInfo.ProfilePhotoUrl), userInfo.ProfilePhotoUrl ?? string.Empty));
            claims.Add(new Claim(nameof(UserInfo.Status), ((int)userInfo.Status).ToString()));

            // 網路上常看到的這個 NameId 設定是多餘的
            //claims.Add(new Claim(JwtRegisteredClaimNames.NameId, userName));

            // 這個 Claim 也以直接被 JwtRegisteredClaimNames.Sub 取代，所以也是多餘的
            //claims.Add(new Claim(ClaimTypes.Name, userName));

            // 你可以自行擴充 "roles" 加入登入者該有的角色
            //claims.Add(new Claim("roles", "Admin"));
            //claims.Add(new Claim("roles", "Users"));

            var userClaimsIdentity = new ClaimsIdentity(claims);

            // 建立一組對稱式加密的金鑰，主要用於 JWT 簽章之用
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signKey));

            // HmacSha256 有要求必須要大於 128 bits，所以 key 不能太短，至少要 16 字元以上
            // https://stackoverflow.com/questions/47279947/idx10603-the-algorithm-hs256-requires-the-securitykey-keysize-to-be-greater
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            // 建立 SecurityTokenDescriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                //Audience = issuer, // 由於你的 API 受眾通常沒有區分特別對象，因此通常不太需要設定，也不太需要驗證
                //NotBefore = DateTime.Now, // 預設值就是 DateTime.Now
                //IssuedAt = DateTime.Now, // 預設值就是 DateTime.Now
                Subject = userClaimsIdentity,
                Expires = DateTime.Now.AddMinutes(expireMinutes),
                SigningCredentials = signingCredentials
            };

            // 產出所需要的 JWT securityToken 物件，並取得序列化後的 Token 結果(字串格式)
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var serializeToken = tokenHandler.WriteToken(securityToken);

            return serializeToken;
        }

        /// <summary>
        /// 從 JwtToken 取得會員資訊
        /// </summary>
        /// <param name="jwtToken">jwtToken</param>
        /// <returns>會員資訊</returns>
        public UserInfo GetUserInfoFromJwtToken(string jwtToken)
        {
            if (string.IsNullOrEmpty(jwtToken))
                return null;

            var jsonToken = new JwtSecurityTokenHandler().ReadToken(jwtToken) as JwtSecurityToken;

            UserInfo userInfo = new UserInfo()
            {
                MemberID = int.TryParse(jsonToken.Claims.FirstOrDefault(p => p.Type == nameof(UserInfo.MemberID))?.Value, out int memberID) ? memberID : 0,
                Account = jsonToken.Claims.FirstOrDefault(p => p.Type == nameof(UserInfo.Account))?.Value,
                NickName = jsonToken.Claims.FirstOrDefault(p => p.Type == nameof(UserInfo.NickName))?.Value,
                ProfilePhotoUrl = jsonToken.Claims.FirstOrDefault(p => p.Type == nameof(UserInfo.ProfilePhotoUrl))?.Value,
                Status = (MemberStatusEnum)Convert.ToInt32(jsonToken.Claims.FirstOrDefault(p => p.Type == nameof(UserInfo.Status))?.Value),
            };

            return userInfo;

        }
    }
}