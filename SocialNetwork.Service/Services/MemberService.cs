using Microsoft.Extensions.Configuration;
using SocialNetwork.Repository;
using System;

namespace SocialNetwork.Service
{
    public class MemberService : IMemberService
    {
        /// <summary>
        /// Mart repository
        /// </summary>
        private readonly IMemberRepository MemberRepository;

        public MemberService(
            IMemberRepository martRepository)
        {
            MemberRepository = martRepository;
        }

        public string Test()
        {
            return MemberRepository.Test();
        }
    }
}