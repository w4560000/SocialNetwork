using Dapper;
using SocialNetwork.Helper;
using SocialNetwork.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// TestPostgreSQLRepository
    /// </summary>
    public class TestPostgreSQLRepository : RepositoryBase<TestPostgreSQL>, ITestPostgreSQLRepository
    {
        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="userContext">IUserContext</param>
        /// <param name="factory">IPostgreSqlConnectionFactory</param>
        /// <param name="configHelper">IConfigHelper</param>
        public TestPostgreSQLRepository(
            IUserContext userContext,
            IPostgreSqlConnectionFactory factory,
            IConfigHelper configHelper) : base(userContext, factory, configHelper)
        {
        }

        /// <summary>
        /// 測試
        /// </summary>
        /// <returns>testname</returns>
        public string Test()
        {
            return this.Connection.GetList<TestPostgreSQL>("WHERE 1 = 1").FirstOrDefault()?.testname;
        }
    }
}
