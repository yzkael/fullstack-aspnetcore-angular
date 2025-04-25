using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using src.Dtos;
using src.Interfaces;

namespace src.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthControllers : ControllerBase
    {
        private readonly IAuthServices _authServices;

        public AuthControllers(IAuthServices authServices)
        {
            _authServices = authServices;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequestData data)
        {
            LoginResponseData response = await _authServices.LoginRequest(data);
            if (!response.Succeded)
            {
                return BadRequest("Wrong username or password");
            }
            return Ok(response);
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequestData data)
        {
            RegisterResponseData register = await _authServices.RegisterRequest(data);
            if (register.Errors.Count != 0)
            {
                return BadRequest(register.Errors);
            }
            return Created();
        }

    }
}