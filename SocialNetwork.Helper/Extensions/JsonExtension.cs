using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Xml;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// Json擴充方法
    /// </summary>
    public static class JsonExtension
    {
        /// <summary>
        /// JsonString To Object轉型驗證[正確:物件，錯誤:null]
        /// </summary>
        /// <param name="jsonString">json格式參數</param>
        /// <returns>回傳物件</returns>
        public static object DeserializeObject(string jsonString)
        {
            try
            {
                // string To Json物件，若轉型錯誤則輸出null
                object jsonObj = JsonConvert.DeserializeObject(jsonString);
                return jsonObj;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// JsonString To Object轉型驗證[正確:指定的物件，錯誤:null]
        /// </summary>
        /// <typeparam name="T">物件類型</typeparam>
        /// <param name="jsonString">json格式參數</param>
        /// <returns>回傳物件</returns>
        public static T DeserializeObject<T>(string jsonString)
        {
            try
            {
                // string To Json物件，若轉型錯誤則輸出null
                T requestObject = JsonConvert.DeserializeObject<T>(jsonString);
                return requestObject;
            }
            catch (Exception)
            {
                return (T)((object)null);
            }
        }

        /// <summary>
        /// Object TO JsonString轉型驗證[正確:指定的物件，錯誤:null]
        /// </summary>
        /// <typeparam name="T">泛型型別</typeparam>
        /// <param name="Object">物件</param>
        /// <returns>回傳:JsonString指定的物件參數</returns>
        public static string SerializeObject<T>(T Object)
        {
            try
            {
                return JsonConvert.SerializeObject(Object);
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Xml To JsonString轉型驗證[正確:jsonString，錯誤:null]
        /// </summary>
        /// <param name="xmlDoc">xml文件</param>
        /// <returns>轉型正確回傳jsonString,錯誤則null</returns>
        public static string SerializeXmlNode(XmlDocument xmlDoc)
        {
            try
            {
                return JsonConvert.SerializeXmlNode(xmlDoc);
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// 物件轉JSON字串
        /// </summary>
        /// <param name="target">物件</param>
        /// <param name="isCamelCase">JSON鍵值是否為小駝峰，預設true</param>
        /// <returns>JSON字串</returns>
        public static string ToJson(this object target, bool isCamelCase = true)
        {
            JsonSerializerSettings setting = new JsonSerializerSettings()
            {
                ContractResolver = isCamelCase ? new CamelCasePropertyNamesContractResolver() : new DefaultContractResolver()
            };

            return JsonConvert.SerializeObject(target, Newtonsoft.Json.Formatting.None, setting);
        }

        /// <summary>
        /// JSON字串轉物件
        /// </summary>
        /// <typeparam name="T">物件類型</typeparam>
        /// <param name="s">JSON字串</param>
        /// <returns>物件</returns>
        public static T ToTypedObject<T>(this string s)
        {
            // 去掉字串的前後空白、換行、tab 符號
            s = s?.Trim('\r', '\n', '\t', ' ');
            if (string.IsNullOrEmpty(s) || !Regex.IsMatch(s, @"^(\[|\{)(.|\n)*(\]|\})$", RegexOptions.Compiled))
            {
                return default(T);
            }

            return JsonConvert.DeserializeObject<T>(s);
        }

        /// <summary>
        /// XML 轉成 Json 物件
        /// </summary>
        /// <param name="xml">xml 字串</param>
        /// <returns>JSON 物件</returns>
        public static dynamic XmlToJsonObject(string xml)
        {
            // 載入XML字串
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(xml);

            string jsonData = JsonExtension.SerializeXmlNode(xmlDoc);

            if (string.IsNullOrWhiteSpace(jsonData))
            {
                return null;
            }

            return JsonExtension.DeserializeObject(jsonData);
        }

        /// <summary>
        /// 物件陣列轉成 json lines 格式
        /// </summary>
        /// <see cref="http://jsonlines.org/"/>
        /// <param name="objects">物件陣列</param>
        /// <returns>json lines 格式</returns>
        public static string ToJsonLines(this IEnumerable<object> objects)
        {
            if (objects.IsNullOrEmpty())
            {
                return string.Empty;
            }

            List<string> jsonLines = objects.Select(x => x.ToJson())
                                            .ToList();

            string content = string.Join(Environment.NewLine, jsonLines);

            return content;
        }
    }
}
