using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using src.Domain;

namespace src.Interfaces
{
    public interface ITokenServices
    {
        public Task<string> CreateToken(User user);

        public string DecodeTokenAndGetUsername(string token);
    }
}