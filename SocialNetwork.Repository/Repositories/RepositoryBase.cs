using SocialNetwork.Helper;
using SocialNetwork.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork.Repository
{
    /// <summary>
    /// 基礎儲存庫
    /// </summary>
    /// <typeparam name="TEntity">Type of entity</typeparam>
    public class RepositoryBase<TEntity> : GenericRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// User Context
        /// </summary>
        private readonly IUserContext UserContext;

        /// <summary>
        /// Configer Helper
        /// </summary>
        private readonly IConfigHelper ConfigHelper;

        /// <summary>
        /// Entity 是否包含編輯欄位
        /// </summary>
        private readonly bool IsEditColumn;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="userContext">IUserContext <see cref="IUserContext"/></param>
        /// <param name="factory">IConnectionFactory <see cref="IConnectionFactory"/></param>
        /// <param name="configHelper">IConfigHelper</param>
        public RepositoryBase(
            IUserContext userContext,
            IConnectionFactory factory,
            IConfigHelper configHelper) : base(factory, configHelper)
        {
            Type[] interfaces = typeof(TEntity).GetInterfaces();
            if (factory == null)
            {
                throw new ArgumentNullException(nameof(factory));
            }

            this.UserContext = userContext;
            this.ConfigHelper = configHelper;
            this.IsEditColumn = interfaces.Contains(typeof(IEditColumn));
        }

        /// <summary>
        /// 複寫資料新增方法，當entity有繼承IEditColumn介面時，新增IEditColumn欄位資料
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        public override object Add(TEntity entity)
        {
            if (this.IsEditColumn)
            {
                IEditColumn editModel = (IEditColumn)entity;
                editModel.CreatedAt = DateTime.Now;
                editModel.CreatedBy = this.UserContext.User.Id;
                editModel.UpdatedAt = DateTime.Now;
                editModel.UpdatedBy = this.UserContext.User.Id;
            }

            return base.Add(entity);
        }

        /// <summary>
        /// 複寫資料新增方法，當entity有繼承IEditColumn介面時，新增IEditColumn欄位資料
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        public override TId Add<TId>(TEntity entity)
        {
            if (this.IsEditColumn)
            {
                IEditColumn editModel = (IEditColumn)entity;
                editModel.CreatedAt = DateTime.Now;
                editModel.CreatedBy = this.UserContext.User.Id;
                editModel.UpdatedAt = DateTime.Now;
                editModel.UpdatedBy = this.UserContext.User.Id;
            }

            return base.Add<TId>(entity);
        }

        /// <summary>
        /// [非同步]複寫資料新增方法，當entity有繼承IEditColumn介面時，新增IEditColumn欄位資料
        /// </summary>
        /// <typeparam name="TId">主鍵類型</typeparam>
        /// <param name="entity">資料庫物件</param>
        /// <returns>
        /// The ID (primary key) of the newly inserted record if it is identity using the defined
        /// type, otherwise null
        /// </returns>
        public override Task<TId> AddAsync<TId>(TEntity entity)
        {
            if (this.IsEditColumn)
            {
                IEditColumn editModel = (IEditColumn)entity;
                editModel.CreatedAt = DateTime.Now;
                editModel.CreatedBy = this.UserContext.User.Id;
                editModel.UpdatedAt = DateTime.Now;
                editModel.UpdatedBy = this.UserContext.User.Id;
            }

            return base.AddAsync<TId>(entity);
        }

        /// <summary>
        /// 複寫資料更新方法，當entity有繼承IEditColumn介面時，更新IEditColumn欄位資料
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>The number of effected records</returns>
        public override int Update(TEntity entity)
        {
            if (this.IsEditColumn)
            {
                IEditColumn editModel = (IEditColumn)entity;
                editModel.UpdatedAt = DateTime.Now;
                editModel.UpdatedBy = this.UserContext.User.Id;
            }

            return base.Update(entity);
        }

        /// <summary>
        /// [非同步]複寫資料更新方法，當entity有繼承IEditColumn介面時，更新IEditColumn欄位資料
        /// </summary>
        /// <param name="entity">資料庫物件</param>
        /// <returns>The number of effected records</returns>
        public override Task<int> UpdateAsync(TEntity entity)
        {
            if (this.IsEditColumn)
            {
                IEditColumn editModel = (IEditColumn)entity;
                editModel.UpdatedAt = DateTime.Now;
                editModel.UpdatedBy = this.UserContext.User.Id;
            }

            return base.UpdateAsync(entity);
        }

        /// <summary>
        /// 大量資料新增時，統一處理建立日期、人員，修改日期、人員
        /// </summary>
        /// <param name="entities">資料物件</param>
        /// <returns>完成處理的資料物件清單</returns>
        public List<TEntity> BulkInsert(IEnumerable<TEntity> entities)
        {
            List<TEntity> updatedEntities = entities.ToList();
            DateTime createdAt = DateTime.Now;
            string createdBy = this.UserContext.User.Id;
            foreach (TEntity entity in updatedEntities)
            {
                if (this.IsEditColumn)
                {
                    IEditColumn editEntity = (IEditColumn)entity;
                    editEntity.CreatedAt = createdAt;
                    editEntity.CreatedBy = createdBy;
                    editEntity.UpdatedAt = createdAt;
                    editEntity.UpdatedBy = createdBy;
                }
            }

            return updatedEntities;
        }

        /// <summary>
        /// 大量資料更新時，統一處理修改日期與人員
        /// </summary>
        /// <param name="entities">資料物件</param>
        /// <returns>完成處理的資料物件清單</returns>
        public List<TEntity> BulkUpdate(IEnumerable<TEntity> entities)
        {
            List<TEntity> updatedEntities = entities.ToList();
            DateTime updatedAt = DateTime.Now;
            string updatedBy = this.UserContext.User.Id;
            foreach (TEntity entity in updatedEntities)
            {
                if (this.IsEditColumn)
                {
                    IEditColumn editEntity = (IEditColumn)entity;
                    editEntity.UpdatedAt = updatedAt;
                    editEntity.UpdatedBy = updatedBy;
                }
            }

            return updatedEntities;
        }
    }
}