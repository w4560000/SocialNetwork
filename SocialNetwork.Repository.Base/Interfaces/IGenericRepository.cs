using System.Collections.Generic;
using System.Threading.Tasks;

namespace SocialNetwork.Repository.Base
{
    /// <summary>
    /// 基礎儲存庫介面
    /// </summary>
    /// <typeparam name="TEntity">資料庫物件</typeparam>
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        object Add(TEntity entity);

        /// <summary>
        /// 新增
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        TId Add<TId>(TEntity entity);

        /// <summary>
        /// 新增
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        Task<TId> AddAsync<TId>(TEntity entity);

        /// <summary>
        /// 刪除
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        void Delete(TEntity entity);

        /// <summary>
        /// [非同步]刪除
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        Task<int> DeleteAsync(TEntity entity);

        /// <summary>
        /// 根據條件刪除多筆紀錄
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>被刪除的筆數</returns>
        int DeleteList(object conditions);

        /// <summary>
        /// [非同步]根據條件刪除多筆紀錄
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>被刪除的筆數</returns>
        Task<int> DeleteListAsync(object conditions);

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
        int DeleteList(string conditions, object parameters = null);

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
        Task<int> DeleteListAsync(string conditions, object parameters = null);

        /// <summary>
        /// 根據主鍵取得物件
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="id">值</param>
        /// <returns>資料庫物件</returns>
        TEntity Get<TId>(TId id);

        /// <summary>
        /// 嘗試根據主鍵取得物件
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="id">值</param>
        /// <param name="entity">資料庫物件</param>
        /// <returns>是否取得成功</returns>
        bool TryGetEntity<TId>(TId id, out TEntity entity);

        /// <summary>
        /// [非同步]根據主鍵取得物件
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="id">值</param>
        /// <returns>資料庫物件</returns>
        Task<TEntity> GetAsync<TId>(TId id);

        /// <summary>
        /// 根據條件取得物件列表
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>資料庫物件列表</returns>
        IEnumerable<TEntity> GetList(object conditions);

        /// <summary>
        /// [非同步]根據條件取得物件列表
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>資料庫物件列表</returns>
        Task<IEnumerable<TEntity>> GetListAsync(object conditions);

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
        IEnumerable<TEntity> GetList(string conditions, object parameters = null);

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
        Task<IEnumerable<TEntity>> GetListAsync(string conditions, object parameters = null);

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
        IEnumerable<TEntity> GetListPaged(int pageNumber, int rowsPerPage, string conditions = "",
            string orderby = "", object parameters = null);

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
        Task<IEnumerable<TEntity>> GetListPagedAsync(int pageNumber, int rowsPerPage,
            string conditions = "", string orderby = "", object parameters = null);

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
        int RecordCount(string conditions = "", object parameters = null);

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
        Task<int> RecordCountAsync(string conditions = "", object parameters = null);

        /// <summary>
        /// 取得資料筆數
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>資料筆數</returns>
        int RecordCount(object conditions);

        /// <summary>
        /// [非同步]取得資料筆數
        /// </summary>
        /// <param name="conditions">查詢條件物件ex: new {Category = 1, SubCategory=2}</param>
        /// <returns>資料筆數</returns>
        Task<int> RecordCountAsync(object conditions);

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>The number of effected records</returns>
        int Update(TEntity entity);

        /// <summary>
        /// [非同步]更新
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>The number of effected records</returns>
        Task<int> UpdateAsync(TEntity entity);
    }
}