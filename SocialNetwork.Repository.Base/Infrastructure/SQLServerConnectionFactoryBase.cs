using Dapper;
using SocialNetwork.Helper;
using StackExchange.Profiling;
using System.Data;
using System.Data.Common;

namespace SocialNetwork.Repository.Base
{
    /// <summary>
    /// 資料庫連線字串介面
    /// </summary>
    public class SQLServerConnectionFactoryBase : ISQLServerConnectionFactory
    {
        /// <summary>
        /// ConfigHelper
        /// </summary>
        private readonly IConfigHelper ConfigHelper;

        /// <summary>
        /// Construct
        /// </summary>
        public SQLServerConnectionFactoryBase(
            IConfigHelper configHelper)
        {
            this.ConfigHelper = configHelper;
        }

        /// <summary>
        /// 資料庫連線
        /// </summary>
        private IDbConnection ConnectionInstance;

        /// <summary>
        /// 資料庫連線
        /// </summary>
        public virtual IDbConnection Connection
        {
            get
            {
                if (this.ConnectionInstance == null)
                {
                    DbConnection connection = new System.Data.SqlClient.SqlConnection(ConfigHelper.Get("ConnectionStrings:SocialNetworkConnectionString"));

                    // Creates a ProfiledDbConnection instance and opens it
                    this.ConnectionInstance = new StackExchange.Profiling.Data.ProfiledDbConnection(connection, MiniProfiler.Current);
                }

                // Dialect is static private field, 當同一個服務要求使用了兩個以上的DB，須重新設定
                SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLServer);
                return this.ConnectionInstance;
            }
            set => this.ConnectionInstance = value;
        }

        /// <summary>
        /// 連線字串名稱
        /// </summary>
        public virtual string ConnectionKey { set; get; }
    }
}