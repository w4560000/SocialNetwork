using Newtonsoft.Json;
using SocialNetwork.Helper;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace SocialNetwork
{
    /// <summary>
    /// HttpClientHelper
    /// </summary>
    public class HttpClientHelper
    {
        /// <summary>
        /// IHttpClientFactory
        /// </summary>
        private readonly IHttpClientFactory HttpClientFactory;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="httpClientFactory">IHttpClientFactory</param>
        public HttpClientHelper(
            IHttpClientFactory httpClientFactory)
        {
            this.HttpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// get 方法
        /// </summary>
        /// <typeparam name="T">回傳型態</typeparam>
        /// <param name="url">url</param>
        /// <param name="headers">header</param>
        /// <returns>回傳物件</returns>
        public T Get<T>(string url, Dictionary<string, string> headers = null)
        {
            string json = string.Empty;
            var httpClient = this.HttpClientFactory.CreateClient();
            this.AddHeader(headers, httpClient);

            using (var response = httpClient.GetAsync(url).ConfigureAwait(false).GetAwaiter().GetResult())
            {
                json = response.Content.ReadAsStringAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            }

            T result = json.ToTypedObject<T>();

            return result;
        }

        /// <summary>
        /// GetToken
        /// </summary>
        /// <param name="request">request</param>
        /// <returns>accessToken</returns>
        public GoogleOAuth_GetTokenFromCodeResult GetGoogleAccessToken(GoogleOAuth_GetTokenFromCodeRequest request)
        {
            var httpClient = this.HttpClientFactory.CreateClient();

            var nvc = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>(nameof(GoogleOAuth_GetTokenFromCodeRequest.grant_type), request.grant_type),
                new KeyValuePair<string, string>(nameof(GoogleOAuth_GetTokenFromCodeRequest.code), request.code),
                new KeyValuePair<string, string>(nameof(GoogleOAuth_GetTokenFromCodeRequest.redirect_uri), request.redirect_uri),
                new KeyValuePair<string, string>(nameof(GoogleOAuth_GetTokenFromCodeRequest.client_id), request.client_id),
                new KeyValuePair<string, string>(nameof(GoogleOAuth_GetTokenFromCodeRequest.client_secret), request.client_secret)
            };
            var req = new HttpRequestMessage(HttpMethod.Post, "https://www.googleapis.com/oauth2/v4/token") { Content = new FormUrlEncodedContent(nvc) };

            var response = httpClient.SendAsync(req).ConfigureAwait(false).GetAwaiter().GetResult();

            var json = response.Content.ReadAsStringAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            var access_token = JsonConvert.DeserializeObject<GoogleOAuth_GetTokenFromCodeResult>(json);

            return access_token;
        }
        /// <summary>
        /// GetGoogleUserInfo
        /// </summary>
        /// <param name="access_token">access_token</param>
        /// <returns>GoogleUserInfo</returns>
        public GoogleOAuth_UserInfoResult GetGoogleUserInfo(GoogleOAuth_GetTokenFromCodeResult access_token)
        {
            return this.Get<GoogleOAuth_UserInfoResult>($"https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token={access_token.access_token}");
        }


        /// <summary>
        /// post 方法
        /// </summary>
        /// <typeparam name="T">傳出物件型態</typeparam>
        /// <param name="model">傳出物件參數</param>
        /// <param name="url">url</param>
        /// <param name="headers">headers</param>
        /// <returns>傳出物件</returns>
        public T Post<T>(object model, string url, Dictionary<string, string> headers = null)
        {
            string json = string.Empty;
            var httpClient = this.HttpClientFactory.CreateClient();
            this.AddHeader(headers, httpClient);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            string requestModel = JsonConvert.SerializeObject(model);
            HttpContent contentPost = new StringContent(requestModel, Encoding.UTF8, "application/json");

            using (var response = httpClient.PostAsync(url, contentPost).ConfigureAwait(false).GetAwaiter().GetResult())
            {
                json = response.Content.ReadAsStringAsync().Result;
            }

            T result = json.ToTypedObject<T>();

            return result;
        }

        /// <summary>
        /// 加入 http header
        /// </summary>
        /// <param name="headers">headers</param>
        /// <param name="client">client 連線物件</param>
        private void AddHeader(Dictionary<string, string> headers, HttpClient client)
        {
            if (headers == null)
            {
                return;
            }

            foreach (KeyValuePair<string, string> header in headers)
            {
                client.DefaultRequestHeaders.Add(header.Key, header.Value);
            }
        }
    }

    public class GoogleOAuth_UserInfoResult
    {
        public string id { get; set; }
        public string email { get; set; }
        public bool verified_email { get; set; }
        public string name { get; set; }
        public string given_name { get; set; }
        public string family_name { get; set; }
        public string link { get; set; }
        public string picture { get; set; }
        public string locale { get; set; }
    }

    public class GoogleOAuth_GetTokenFromCodeRequest
    {
        public string grant_type { get; set; }
        public string code { get; set; }
        public string redirect_uri { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
    }

    public class GoogleOAuth_GetTokenFromCodeResult
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string scope { get; set; }
        public string token_type { get; set; }
        public string id_token { get; set; }
    }
}
