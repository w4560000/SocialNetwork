using System.Collections.Generic;
using System.Linq;

namespace SocialNetwork.Helper
{
    /// <summary>
    /// IEnumerableExtension
    /// </summary>
    public static class IEnumerableExtension
    {
        /// <summary>
        /// 判斷集合是否為空
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> source)
        {
            return source == null || !source.Any();
        }

        /// <summary>
        /// 檢查兩集合中的物件是否相同，預設重複的物件視為相同，
        /// 例如第一個集合為{1,1}，第二個集合為{1}則這兩個集合視為相同，
        /// 但是當isIgnoreDuplicate設為false，則視為不同
        /// </summary>
        /// <typeparam name="TSource">集合內物件類型</typeparam>
        /// <param name="first">第一個集合</param>
        /// <param name="second">第二個集合</param>
        /// <param name="isIgnoreDuplicate">是否忽略重複的物件</param>
        /// <returns>相同或不同</returns>
        public static bool Same<TSource>(this IEnumerable<TSource> first, IEnumerable<TSource> second, bool isIgnoreDuplicate = true)
        {
            return isIgnoreDuplicate
                ? !first.Except(second).Any() && !second.Except(first).Any()
                : !first.Except(second).Any() && first.Count() == second.Count();
        }

        /// <summary>
        /// 檢查兩集合中的物件是否相同，預設重複的物件視為相同，
        /// 例如第一個集合為{1,1}，第二個集合為{1}則這兩個集合視為相同，
        /// 但是當isIgnoreDuplicate設為false，則視為不同
        /// </summary>
        /// <typeparam name="TSource">集合內物件類型</typeparam>
        /// <param name="first">第一個集合</param>
        /// <param name="second">第二個集合</param>
        /// <param name="comparer">System.Collections.Generic.IEqualityComparer`1 來比較值。</param>
        /// <returns>相同或不同</returns>
        public static bool Same<TSource>(this IEnumerable<TSource> first, IEnumerable<TSource> second, IEqualityComparer<TSource> comparer)
        {
            return !first.Except(second, comparer).Any() && !second.Except(first, comparer).Any();
        }
    }
}