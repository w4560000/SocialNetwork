using System.Net.Mail;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// MailHelper
    /// </summary>
    public static class MailHelper
    {
        /// <summary>
        /// Mail發送
        /// </summary>
        /// <param name="mailAddress">電子郵件</param>
        /// <param name="mailBody">信件內容</param>
        public static void MailSend(string mailAddress, string mailBody)
        {
            //檢查是否輸入空值
            if (string.IsNullOrEmpty(mailAddress))
                return;

            using (MailMessage mail = new MailMessage())
            {
                //前面是發信email後面是顯示的名稱
                mail.From = new MailAddress("leozheng0417@gmail.com", "IKKON");

                //收信者email
                mail.To.Add(mailAddress);

                //設定優先權
                mail.Priority = MailPriority.Normal;

                //標題
                mail.Subject = "IKKON 註冊驗證";

                //Mail內容
                mail.Body = mailBody;

                //內容使用html
                mail.IsBodyHtml = true;

                //設定gmail的smtp (這是google的)
                SmtpClient MySmtp = new SmtpClient("smtp.gmail.com", 587);

                //您在gmail的帳號密碼
                MySmtp.Credentials = new System.Net.NetworkCredential("leozheng0417@gmail.com", "qxhcjoppdbsoynmz");

                MySmtp.EnableSsl = true;

                //發送郵件
                MySmtp.Send(mail);
            }
        }
    }
}