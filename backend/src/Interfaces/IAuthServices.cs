using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using src.Dtos;

namespace src.Interfaces
{
    public interface IAuthServices
    {
        public Task<LoginResponseData> LoginRequest(LoginRequestData data);
        public Task<RegisterResponseData> RegisterRequest(RegisterRequestData data);
    }
}