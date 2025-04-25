using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace src.Dtos
{
    public class LoginResponseData
    {
        public string UserId { get; set; } = null!;
        public List<string> Roles { get; set; } = null!;
        public string Token { get; set; } = null!;
        public string Email { get; set; } = null!;
        public bool Succeded { get; set; } = false;
    }
}