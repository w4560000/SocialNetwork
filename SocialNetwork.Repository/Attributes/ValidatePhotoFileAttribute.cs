using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 檢查檔案 Attribute
    /// </summary>
    public class ValidatePhotoFileAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value">value</param>
        /// <param name="validationContext">validationContext</param>
        /// <returns>Result</returns>
        protected override ValidationResult IsValid(
        object value, ValidationContext validationContext)
        {
            List<string> _extensions = new List<string>() { ".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif" };
            long fileLengthLimit = 5 * 1024 * 1024; // 5 MB

            var fileList = value as List<IFormFile>;

            if (fileList.Any())
            {
                if (fileList.Count > 10)
                    return new ValidationResult("單筆貼文圖片限定最多上傳 10 張");

                foreach (var file in fileList)
                {
                    var extension = Path.GetExtension(file.FileName);
                    if (!_extensions.Contains(extension.ToLower()))
                        return new ValidationResult("圖片僅限上傳 .jpg、.jpeg、.png、.webp、.svg、.gif");

                    if (file.Length > fileLengthLimit)
                        return new ValidationResult("單張圖片大小不得超過 5 MB");
                }
            }

            return ValidationResult.Success;
        }
    }
}