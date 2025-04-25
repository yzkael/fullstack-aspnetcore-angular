using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace src.Dtos
{
    public class RegisterRequestData
    {
        [Required(ErrorMessage = "Username is required.")]
        public string Username { get; init; } = null!;
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = null!;
        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; } = null!;
    }
}