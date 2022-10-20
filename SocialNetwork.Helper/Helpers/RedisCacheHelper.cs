using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// Redis 快取
    /// </summary>
    public class RedisCacheHelper : ICacheHelper, IDisposable
    {
        /// <summary>
        /// 鎖定物件
        /// </summary>
        private static readonly object LockObject = new object();

        /// <summary>
        /// 取得config appsetting
        /// </summary>
        private readonly IConfigHelper ConfigHelper;

        /// <summary>
        /// Represents an inter-related group of connections to redis servers
        /// </summary>
        private ConnectionMultiplexer Redis;

        /// <summary>
        /// Track whether Dispose has been called.
        /// </summary>
        private bool Disposed = false;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="configHelper"></param>
        public RedisCacheHelper(IConfigHelper configHelper)
        {
            this.ConfigHelper = configHelper;
        }

        /// <summary>
        /// Destructor
        /// </summary>
        ~RedisCacheHelper()
        {
            this.Dispose(false);
        }

        /// <summary>
        /// Redis 連線
        /// </summary>
        /// <exception cref="AggregateException">Redis Server 連線錯誤</exception>
        private ConnectionMultiplexer Connection
        {
            get
            {
                if (this.Redis == null || !this.Redis.IsConnected)
                {
                    lock (LockObject)
                    {
                        if (this.Redis == null || !this.Redis.IsConnected)
                        {
                            string redisConnection = this.ConfigHelper.Get("RedisSettings:Connection");
                            string redisPassword = this.ConfigHelper.Get("RedisSettings:Password");

                            ConfigurationOptions configurationOptions = ConfigurationOptions.Parse(redisConnection);
                            configurationOptions.Password = redisPassword;

                            this.Redis = ConnectionMultiplexer.Connect(configurationOptions);
                        }
                    }
                }

                return this.Redis;
            }
        }

        /// <summary>
        /// 清除所有快取
        /// </summary>
        public void Clear()
        {
            EndPoint[] endpoints = this.Connection.GetEndPoints(true);

            foreach (EndPoint endpoint in endpoints)
            {
                IServer server = this.Connection.GetServer(endpoint);

                server.FlushDatabase(database: this.RedisDB().Database);
            }
        }

        /// <summary>
        /// 清除所有快取
        /// </summary>
        public async Task ClearAsync()
        {
            EndPoint[] endpoints = this.Connection.GetEndPoints(true);

            foreach (EndPoint endpoint in endpoints)
            {
                IServer server = this.Connection.GetServer(endpoint);

                await server.FlushDatabaseAsync(database: this.RedisDB().Database);
            }
        }

        /// <summary>
        /// 取得快取內容
        /// </summary>
        /// <typeparam name="T">Type</typeparam>
        /// <param name="key">The key of the value to get.</param>
        /// <returns>The value associated with the specified key.</returns>
        public T Get<T>(string key)
        {
            Task<RedisValue> getTask = this.RedisDB().StringGetAsync(key);
            RedisValue cacheData = this.RedisDB().Wait<RedisValue>(getTask);

            if (cacheData.IsNullOrEmpty)
            {
                return default;
            }

            if (typeof(T).IsValueType || typeof(T) == typeof(string))
            {
                return (T)Convert.ChangeType(cacheData.ToString(), typeof(T));
            }

            return cacheData.ToString().ToTypedObject<T>();
        }

        /// <summary>
        /// 取得快取內容
        /// </summary>
        /// <typeparam name="T">Type</typeparam>
        /// <param name="key">The key of the value to get.</param>
        /// <returns>The value associated with the specified key.</returns>
        public async Task<T> GetAsync<T>(string key)
        {
            RedisValue cacheData = await this.RedisDB().StringGetAsync(key);

            if (cacheData.IsNullOrEmpty)
            {
                return default;
            }

            if (typeof(T).IsValueType || typeof(T) == typeof(string))
            {
                return (T)Convert.ChangeType(cacheData.ToString(), typeof(T));
            }

            return cacheData.ToString().ToTypedObject<T>();
        }

        /// <summary>
        /// 確定快取鍵值是否存在
        /// </summary>
        public bool IsSet(string key) => this.RedisDB().KeyExists(key);

        /// <summary>
        /// 確定快取鍵值是否存在
        /// </summary>
        public async Task<bool> IsSetAsync(string key) => await this.RedisDB().KeyExistsAsync(key);

        /// <summary>
        /// 移除快取內容
        /// </summary>
        public void Remove(string key) => this.RedisDB().KeyDelete(key);

        /// <summary>
        /// 移除快取內容
        /// </summary>
        public async Task RemoveAsync(string key) => await this.RedisDB().KeyDeleteAsync(key);

        /// <summary>
        /// 依據鍵值樣式移除快取內容
        /// </summary>
        /// <param name="pattern">
        /// h?llo matches hello, hallo and hxllo h*lo matches hllo and heeeello h[ae]llo matches
        /// hello and hallo, but not hillo h[^e]llo matches hallo, hbllo, ... but not hello h[a-b]llo
        /// matches hallo and hbllo
        /// </param>
        public void RemoveByPattern(string pattern)
        {
            List<string> keysToRemove = new List<string>();
            EndPoint[] endpoints = this.Connection.GetEndPoints(true);

            foreach (EndPoint endpoint in endpoints)
            {
                IServer server = this.Connection.GetServer(endpoint);

                // 取得設定的 Database 中的 Keys
                foreach (RedisKey item in server.Keys(database: this.RedisDB().Database, pattern: pattern))
                {
                    keysToRemove.Add(item);
                }
            }

            foreach (string key in keysToRemove)
            {
                this.Remove(key);
            }
        }

        /// <summary>
        /// 依據鍵值樣式移除快取內容
        /// </summary>
        /// <param name="pattern">
        /// h?llo matches hello, hallo and hxllo h*lo matches hllo and heeeello h[ae]llo matches
        /// hello and hallo, but not hillo h[^e]llo matches hallo, hbllo, ... but not hello h[a-b]llo
        /// matches hallo and hbllo
        /// </param>
        public async Task RemoveByPatternAsync(string pattern)
        {
            List<string> keysToRemove = new List<string>();
            EndPoint[] endpoints = this.Connection.GetEndPoints(true);

            foreach (EndPoint endpoint in endpoints)
            {
                IServer server = this.Connection.GetServer(endpoint);

                // 取得設定的 Database 中的 Keys
                foreach (RedisKey item in server.Keys(database: this.RedisDB().Database, pattern: pattern))
                {
                    keysToRemove.Add(item);
                }
            }

            foreach (string key in keysToRemove)
            {
                await this.RemoveAsync(key);
            }
        }

        /// <summary>
        /// 指定快取內容
        /// </summary>
        /// <param name="key">The key of the value to get.</param>
        /// <param name="data">資料</param>
        /// <param name="expiry">到期時間 (null = 無到期時間)</param>
        public void Set(string key, object data, TimeSpan? expiry)
        {
            if (data == null)
            {
                return;
            }

            if (data is string || !data.GetType().IsClass)
            {
                this.RedisDB().StringSetAsync(key, data.ToString(), expiry);

                return;
            }

            string cacheData = data.ToJson();
            this.RedisDB().StringSetAsync(key, cacheData, expiry);
        }

        /// <summary>
        /// 指定快取內容
        /// </summary>
        /// <param name="key">The key of the value to get.</param>
        /// <param name="data">資料</param>
        /// <param name="expiry">到期時間 (null = 無到期時間)</param>
        public async Task SetAsync(string key, object data, TimeSpan? expiry)
        {
            if (data == null)
            {
                return;
            }

            if (data is string || !data.GetType().IsClass)
            {
                await this.RedisDB().StringSetAsync(key, data.ToString(), expiry);

                return;
            }

            string cacheData = data.ToJson();
            await this.RedisDB().StringSetAsync(key, cacheData, expiry);
        }

        /// <summary>
        /// Redis 資料庫 (0~15)
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        private IDatabase RedisDB(int database = -1)
        {
            int configDatabase = this.ConfigHelper.Get<int>("Redis:DefaultDatabase", -1);
            if (database == -1 && configDatabase > -1)
            {
                database = configDatabase;
            }

            if (database < -1 || 15 < database)
            {
                throw new AggregateException("Redis Database 設定為 0 ~ 15");
            }

            return this.Connection.GetDatabase(db: database);
        }

        /// <summary>
        /// Release all resources associated with this object
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            // This object will be cleaned up by the Dispose method. Therefore, you should call
            // GC.SupressFinalize to take this object off the finalization queue and prevent
            // finalization code for this object from executing a second time.
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Dispose
        /// </summary>
        /// <param name="disposing">
        /// If disposing equals true, dispose all managed and unmanaged resources.
        /// </param>
        protected virtual void Dispose(bool disposing)
        {
            // Check to see if Dispose has already been called.
            if (this.Disposed)
            {
                return;
            }

            // If disposing equals true, dispose all managed and unmanaged resources.
            if (disposing)
            {
                // Dispose managed resources.
                this.Redis?.Dispose();
            }

            // Note disposing has been done.
            this.Disposed = true;
        }
    }
}