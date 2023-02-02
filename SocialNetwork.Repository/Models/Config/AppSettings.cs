namespace SocialNetwork.Repository
{
    /// <summary>
    /// AppSettings
    /// </summary>
    public class AppSettings
    {
        /// <summary>
        /// ConnectionStrings
        /// </summary>
        public ConnectionStrings ConnectionStrings { get; set; }

        /// <summary>
        /// JwtSettings
        /// </summary>
        public JwtSettings JwtSettings { get; set; }

        /// <summary>
        /// RedisSettings
        /// </summary>
        public RedisSettings RedisSettings { get; set; }

        /// <summary>
        /// StorageContainerName
        /// </summary>
        public string StorageContainerName { get; set; }
    }

    /// <summary>
    /// ConnectionStrings
    /// </summary>
    public class ConnectionStrings
    {
        /// <summary>
        /// SocialNetworkConnectionString
        /// </summary>
        public string SocialNetworkConnectionString { get; set; }
    }

    /// <summary>
    /// JwtSettings
    /// </summary>
    public class JwtSettings
    {
        /// <summary>
        /// Issuer
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// SignKey
        /// </summary>
        public string SignKey { get; set; }
    }

    /// <summary>
    /// RedisSettings
    /// </summary>
    public class RedisSettings
    {
        /// <summary>
        /// Connection
        /// </summary>
        public string Connection { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        public string Password { get; set; }
    }
}