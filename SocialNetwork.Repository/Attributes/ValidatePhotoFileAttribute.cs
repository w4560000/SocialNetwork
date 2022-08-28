using Microsoft.AspNetCore.Http;
using SocialNetwork.Helper;
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
            if (value is List<IFormFile> fileList)
            {
                if (fileList.Any())
                {
                    if (fileList.Count > 10)
                        return new ValidationResult("單筆貼文圖片限定最多上傳 10 張");

                    foreach (var file in fileList)
                    {
                        (bool isValidateSuccess, ValidationResult result) = ValidatePhoto(file);

                        if (!isValidateSuccess)
                            return result;
                    }
                }
            }
            else if (value is IFormFile file)
            {
                (bool isValidateSuccess, ValidationResult result) = ValidatePhoto(file);

                if (!isValidateSuccess)
                    return result;
            }

            return ValidationResult.Success;
        }

        /// <summary>
        /// 驗證圖檔
        /// </summary>
        /// <param name="file">圖檔</param>
        /// <returns>(驗證是否成功, 驗證結果)</returns>
        private (bool, ValidationResult) ValidatePhoto(IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName);
            if (!SystemHelper.AllowFileExtensions.Contains(extension.ToLower()))
                return (false, new ValidationResult("圖片僅限上傳 .jpg、.jpeg、.png、.webp、.svg、.gif"));

            if (file.Length > SystemHelper.FileLengthLimit)
                return (false, new ValidationResult("單張圖片大小不得超過 5 MB"));

            return (true, null);
        }
    }
}