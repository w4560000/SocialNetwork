using SocialNetwork.Repository;

namespace SocialNetwork.Service
{
    /// <summary>
    /// TestService
    /// </summary>
    public class TestService : ITestService
    {
        /// <summary>
        /// ITestPostgreSQLRepository
        /// </summary>
        private readonly ITestPostgreSQLRepository TestPostgreSQLRepository;

        /// <summary>
        /// Constructor
        /// </summary>
        public TestService(
            ITestPostgreSQLRepository testPostgreSQLRepository)
        {
            this.TestPostgreSQLRepository = testPostgreSQLRepository;
        }

        /// <summary>
        /// 測試
        /// </summary>
        /// <returns>testname</returns>
        public string Test()
        {
            return this.TestPostgreSQLRepository.Test();
        }
    }
}