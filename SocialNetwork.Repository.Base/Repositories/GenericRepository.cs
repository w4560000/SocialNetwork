using Dapper;
using SocialNetwork.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Transactions;
using static Dapper.SqlMapper;

namespace SocialNetwork.Repository.Base
{
    /// <summary>
    /// Generic repository
    /// </summary>
    /// <typeparam name="TEntity">資料庫資料表物件類型</typeparam>
    public abstract class GenericRepository<TEntity> : IDisposable, IGenericRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Connection factory interface. An implementation will be created for each kind of database.
        /// </summary>
        private readonly IConnectionFactory Factory;

        /// <summary>
        /// ConfigHelper
        /// </summary>
        private readonly IConfigHelper ConfigHelper;

        /// <summary>
        /// Track whether Dispose has been called.
        /// </summary>
        private bool Disposed = false;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="factory">IConnectionFactory</param>
        /// <param name="configHelper">IConfigHelper</param>
        protected GenericRepository(
            IConnectionFactory factory,
            IConfigHelper configHelper)
        {
            this.Factory = factory;
            this.ConfigHelper = configHelper;
        }

        /// <summary>
        /// Destructor
        /// </summary>
        ~GenericRepository()
        {
            this.Dispose(false);
        }

        /// <summary>
        /// 資料庫連線
        /// </summary>
        public virtual IDbConnection Connection
        {
            get
            {
                // 登記指定的交易。
                DbConnection conn = this.Factory.Connection as DbConnection;
                if (Transaction.Current != null)
                {
                    conn?.EnlistTransaction(Transaction.Current);
                }

                return conn;
            }
        }

        /// <summary>
        /// 查詢
        /// </summary>
        /// <param name="sql">查詢sql</param>
        /// <param name="param">參數</param>
        /// <returns>Query Result</returns>
        public List<T> Query<T>(string sql, object param)
        {
            return this.Connection.Query<T>(sql, param).ToList();
        }

        /// <summary>
        /// 查詢 Async
        /// </summary>
        /// <param name="sql">查詢sql</param>
        /// <param name="param">參數</param>
        /// <returns>Query Result</returns>
        public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object param)
        {
            return await this.Connection.QueryAsync<T>(sql, param);
        }

        /// <summary>
        /// 查詢多表
        /// </summary>
        /// <param name="sql">查詢sql</param>
        /// <param name="param">參數</param>
        /// <returns>Query Result</returns>
        public GridReader QueryMultiple(string sql, object param)
        {
            return this.Connection.QueryMultiple(sql, param);
        }

        /// <summary>
        /// 查詢多表 Async
        /// </summary>
        /// <param name="sql">查詢sql</param>
        /// <param name="param">參數</param>
        /// <returns>Query Result</returns>
        public async Task<GridReader> QueryMultipleAsync(string sql, object param)
        {
            return await this.Connection.QueryMultipleAsync(sql, param);
        }

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        public virtual object Add(TEntity entity)
        {
            PropertyInfo keyProperty = typeof(TEntity).GetProperties()
                                                      .FirstOrDefault(prop => Attribute.IsDefined(prop, typeof(KeyAttribute)));
            object key = typeof(SimpleCRUD)
                              .GetMethods(BindingFlags.Public | BindingFlags.Static)
                              .FirstOrDefault(x => x.Name == "Insert" && x.IsGenericMethod)
                              ?.MakeGenericMethod(keyProperty.PropertyType)
                              .Invoke(null, new object[] { this.Connection, entity, null, null });
            return key;
        }

        /// <summary>
        /// 新增
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        public virtual TId Add<TId>(TEntity entity)
        {
            return this.Connection.Insert<TId>(entity);
        }

        /// <summary>
        /// 新增
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        public virtual Task<TId> AddAsync<TId>(TEntity entity)
        {
            return this.Connection.InsertAsync<TId>(entity);
        }

        /// <summary>
        /// 刪除
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        public virtual void Delete(TEntity entity)
        {
            this.Connection.Delete(entity);
        }

        /// <summary>
        /// [非同步]刪除
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        public virtual Task<int> DeleteAsync(TEntity entity)
        {
            return this.Connection.DeleteAsync(entity);
        }

        /// <summary>
        /// 根據條件刪除多筆紀錄
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>被刪除的筆數</returns>
        public virtual int DeleteList(object conditions)
        {
            return this.Connection.DeleteList<TEntity>(conditions);
        }

        /// <summary>
        /// [非同步]根據條件刪除多筆紀錄
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>被刪除的筆數</returns>
        public virtual Task<int> DeleteListAsync(object conditions)
        {
            return this.Connection.DeleteListAsync<TEntity>(conditions);
        }

        /// <summary>
        /// 根據條件刪除多筆紀錄
        /// </summary>
        /// <param name="conditions">
        /// conditions is an SQL where clause and/or order by clause ex: "where name='bob'" or "where
        /// age &gt;= @Age".
        /// </param>
        /// <param name="parameters">
        /// parameters is an anonymous type to pass in named parameter values: new { Age = 15 }
        /// </param>
        /// <returns>被刪除的筆數</returns>
        public virtual int DeleteList(string conditions, object parameters = null)
        {
            return this.Connection.DeleteList<TEntity>(conditions, parameters);
        }

        /// <summary>
        /// [非同步]根據條件刪除多筆紀錄
        /// </summary>
        /// <param name="conditions">
        /// conditions is an SQL where clause and/or order by clause ex: "where name='bob'" or "where
        /// age &gt;= @Age".
        /// </param>
        /// <param name="parameters">
        /// parameters is an anonymous type to pass in named parameter values: new { Age = 15 }
        /// </param>
        /// <returns>被刪除的筆數</returns>
        public virtual Task<int> DeleteListAsync(string conditions, object parameters = null)
        {
            return this.Connection.DeleteListAsync<TEntity>(conditions, parameters);
        }

        /// <summary>
        /// Dispose
        /// </summary>
        public void Dispose()
        {
            // 將 sql command 記錄到 log file
            if (this.ConfigHelper.Get<bool>("IsMiniProfilerEnabled"))
            {
                // TODO 是否需要用到 Tracer
                //Tracer.Info(CustomDbProfiler.Current.ProfilerContext.GetCommands());
            }

            this.Dispose(true);
            // This object will be cleaned up by the Dispose method. Therefore, you should call
            // GC.SupressFinalize to take this object off the finalization queue and prevent
            // finalization code for this object from executing a second time.
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// 根據主鍵取得物件
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="id">值</param>
        /// <returns>資料庫物件</returns>
        public virtual TEntity Get<TId>(TId id)
        {
            return this.Connection.Get<TEntity>(id);
        }

        /// <summary>
        /// 嘗試根據主鍵取得物件
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="id">值</param>
        /// <param name="entity">資料庫物件</param>
        /// <returns>是否取得成功</returns>
        public virtual bool TryGetEntity<TId>(TId id, out TEntity entity)
        {
            entity = this.Connection.Get<TEntity>(id);

            return entity != null;
        }
        /// <summary>
        /// [非同步]根據主鍵取得物件
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="id">值</param>
        /// <returns>資料庫物件</returns>
        public virtual Task<TEntity> GetAsync<TId>(TId id)
        {
            return this.Connection.GetAsync<TEntity>(id);
        }

        /// <summary>
        /// 根據條件取得物件列表
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>資料庫物件列表</returns>
        public virtual IEnumerable<TEntity> GetList(object conditions)
        {
            return this.Connection.GetList<TEntity>(conditions);
        }

        /// <summary>
        /// [非同步]根據條件取得物件列表
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>資料庫物件列表</returns>
        public virtual Task<IEnumerable<TEntity>> GetListAsync(object conditions)
        {
            return this.Connection.GetListAsync<TEntity>(conditions);
        }

        /// <summary>
        /// 根據條件取得物件列表
        /// </summary>
        /// <param name="conditions">
        /// conditions is an SQL where clause and/or order by clause ex: "where name='bob'" or "where
        /// age &gt;= @Age".
        /// </param>
        /// <param name="parameters">
        /// parameters is an anonymous type to pass in named parameter values: new { Age = 15 }
        /// </param>
        /// <returns>資料庫物件列表</returns>
        public virtual IEnumerable<TEntity> GetList(string conditions, object parameters = null)
        {
            return this.Connection.GetList<TEntity>(conditions, parameters);
        }

        /// <summary>
        /// [非同步]根據條件取得物件列表
        /// </summary>
        /// <param name="conditions">
        /// conditions is an SQL where clause and/or order by clause ex: "where name='bob'" or "where
        /// age &gt;= @Age".
        /// </param>
        /// <param name="parameters">
        /// parameters is an anonymous type to pass in named parameter values: new { Age = 15 }
        /// </param>
        /// <returns>資料庫物件列表</returns>
        public virtual Task<IEnumerable<TEntity>> GetListAsync(string conditions, object parameters = null)
        {
            return this.Connection.GetListAsync<TEntity>(conditions, parameters);
        }

        /// <summary>
        /// 資料表分頁
        /// </summary>
        /// <param name="pageNumber">[Required] 目前所在分頁</param>
        /// <param name="rowsPerPage">[Required] 每頁資料筆數</param>
        /// <param name="conditions">
        /// [Optional] 篩選條件 An SQL where clause ex: "where name='bob'" or "where age&gt;=@Age"
        /// </param>
        /// <param name="orderby">
        /// [Optional] 資料表欄位排序 A column or list of columns to order by ex: "lastname, age desc" and
        /// default is by primary key
        /// </param>
        /// <param name="parameters">
        /// [Optional] 篩選條件參數 An anonymous type to pass in named parameter values: new { Age = 15 }
        /// </param>
        /// <returns>資料庫物件列表</returns>
        public virtual IEnumerable<TEntity> GetListPaged(int pageNumber, int rowsPerPage, string conditions = "", string orderby = "", object parameters = null)
        {
            IEnumerable<TEntity> entities = this.Connection.GetListPaged<TEntity>(pageNumber, rowsPerPage, conditions, orderby, parameters);

            return entities;
        }

        /// <summary>
        /// [非同步]資料表分頁
        /// </summary>
        /// <param name="pageNumber">[Required] 目前所在分頁</param>
        /// <param name="rowsPerPage">[Required] 每頁資料筆數</param>
        /// <param name="conditions">
        /// [Optional] 篩選條件 An SQL where clause ex: "where name='bob'" or "where age&gt;=@Age"
        /// </param>
        /// <param name="orderby">
        /// [Optional] 資料表欄位排序 A column or list of columns to order by ex: "lastname, age desc" and
        /// default is by primary key
        /// </param>
        /// <param name="parameters">
        /// [Optional] 篩選條件參數 An anonymous type to pass in named parameter values: new { Age = 15 }
        /// </param>
        /// <returns>資料庫物件列表</returns>
        public virtual Task<IEnumerable<TEntity>> GetListPagedAsync(int pageNumber, int rowsPerPage,
            string conditions = "", string orderby = "", object parameters = null)
        {
            return this.Connection.GetListPagedAsync<TEntity>(pageNumber, rowsPerPage, conditions, orderby, parameters);
        }

        /// <summary>
        /// 取得資料筆數
        /// </summary>
        /// <param name="conditions">
        /// [Optional] 篩選條件 An SQL where clause ex: "where name='bob'" or "where age&gt;=@Age"
        /// </param>
        /// <param name="parameters">
        /// [Optional] 篩選條件參數 An anonymous type to pass in named parameter values: new { Age = 15 }
        /// </param>
        /// <returns>資料筆數</returns>
        public virtual int RecordCount(string conditions = "", object parameters = null)
        {
            return this.Connection.RecordCount<TEntity>(conditions, parameters);
        }

        /// <summary>
        /// [非同步]取得資料筆數
        /// </summary>
        /// <param name="conditions">
        /// [Optional] 篩選條件 An SQL where clause ex: "where name='bob'" or "where age&gt;=@Age"
        /// </param>
        /// <param name="parameters">
        /// [Optional] 篩選條件參數 An anonymous type to pass in named parameter values: new { Age = 15 }
        /// </param>
        /// <returns>資料筆數</returns>
        public virtual Task<int> RecordCountAsync(string conditions = "", object parameters = null)
        {
            return this.Connection.RecordCountAsync<TEntity>(conditions, parameters);
        }

        /// <summary>
        /// 取得資料筆數
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>資料筆數</returns>
        public virtual int RecordCount(object conditions)
        {
            return this.Connection.RecordCount<TEntity>(conditions);
        }

        /// <summary>
        /// [非同步]取得資料筆數
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>資料筆數</returns>
        public virtual Task<int> RecordCountAsync(object conditions)
        {
            return this.Connection.RecordCountAsync<TEntity>(conditions);
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>The number of effected records</returns>
        public virtual int Update(TEntity entity)
        {
            return this.Connection.Update(entity);
        }

        /// <summary>
        /// [非同步]更新
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>The number of effected records</returns>
        public virtual Task<int> UpdateAsync(TEntity entity)
        {
            return this.Connection.UpdateAsync(entity);
        }

        ///// <summary>
        ///// 根據條件更新
        ///// </summary>
        ///// <param name="entity">資料庫物件</param>
        ///// <param name="conditions">篩選條件 An SQL where clause ex: "where name='bob'"</param>
        ///// <returns>The number of effected records</returns>
        //protected virtual int Update(TEntity entity, string conditions)
        //{
        //    return this.Connection.Update(entity, conditions);
        //}

        /// <summary>
        /// Dispose
        /// </summary>
        /// <param name="disposing">
        /// If disposing equals true, dispose all managed and unmanaged resources.
        /// </param>
        protected virtual void Dispose(bool disposing)
        {
            // Check to see if Dispose has already been called.
            if (!this.Disposed)
            {
                // If disposing equals true, dispose all managed and unmanaged resources.
                if (disposing)
                {
                    // Dispose managed resources.
                    this.Connection.Dispose();
                }
                // Note disposing has been done.
                this.Disposed = true;
            }
        }
    }
}