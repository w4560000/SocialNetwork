using System.Data;

namespace SocialNetwork.Repository.Base
{
    /// <summary>
    /// 資料庫連線工廠
    /// </summary>
    public interface IConnectionFactory
    {
        /// <summary>
        /// 資料庫連線
        /// </summary>
        IDbConnection Connection { get; set; }
    }
}