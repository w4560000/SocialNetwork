using Microsoft.Extensions.Configuration;
using SocialNetwork.Repository;
using System;

namespace SocialNetwork.Service
{
    /// <summary>
    /// MemberService
    /// </summary>
    public class MemberService : IMemberService
    {
        /// <summary>
        /// Mart repository
        /// </summary>
        private readonly IMemberRepository MemberRepository;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="martRepository">IMemberRepository</param>
        public MemberService(
            IMemberRepository martRepository)
        {
            MemberRepository = martRepository;
        }

        /// <summary>
        /// Test
        /// </summary>
        /// <returns>Test</returns>
        public string Test()
        {
            return MemberRepository.Test();
        }
    }
}