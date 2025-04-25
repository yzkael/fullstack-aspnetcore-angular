using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using src.Domain;
using src.Dtos;

namespace src.Mappers
{
    public static class UserMappers
    {
        public static User ToUserFromRegisterRequestData(this RegisterRequestData dto)
        {
            return new User
            {
                UserName = dto.Username,
                Email = dto.Email,
            };
        }
    }
}