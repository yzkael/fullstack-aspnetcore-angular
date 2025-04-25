using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace src.Dtos
{
    public class LoginRequestData
    {
        [Required(ErrorMessage = "Username is required.")]
        public string Username { get; init; } = null!;
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; init; } = null!;
    }
}