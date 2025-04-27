using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using src.Data;
using src.Domain;
using src.Dtos;
using src.Interfaces;
using src.Mappers;

namespace src.Services
{
    public class AuthServices : IAuthServices
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenServices _tokenServices;
        private readonly AppDbContext _context;

        public AuthServices(UserManager<User> userManager, ITokenServices tokenServices, AppDbContext context)
        {
            _userManager = userManager;
            _tokenServices = tokenServices;
            _context = context;
        }

        public async Task<LoginResponseData> LoginRequest(LoginRequestData data)
        {
            //Defaults to .Succeded = false
            LoginResponseData response = new();

            var userFound = await _userManager.FindByEmailAsync(data.Username);
            if (userFound == null)
            {
                userFound = await _userManager.FindByNameAsync(data.Username);
                if (userFound == null)
                {
                    return response;
                }
            }
            var passwordMatch = await _userManager.CheckPasswordAsync(userFound, data.Password);
            if (!passwordMatch)
            {
                return response;
            }
            var roles = await _userManager.GetRolesAsync(userFound);
            var token = await _tokenServices.CreateToken(userFound);
            response.UserId = userFound.Id;
            response.Email = userFound.Email!;
            response.Roles = roles.ToList();
            response.Token = token;
            response.Succeded = true;
            return response;

        }

        public async Task<RegisterResponseData> RegisterRequest(RegisterRequestData data)
        {
            RegisterResponseData response = new();
            if (await _userManager.FindByNameAsync(data.Username) != null)
            {
                response.Errors.Add("Username is already in use.");
                return response;
            }
            if (await _userManager.FindByEmailAsync(data.Email) != null)
            {
                response.Errors.Add("Email is already in use.");
                return response;
            }
            var createdUser = await _userManager.CreateAsync(data.ToUserFromRegisterRequestData(), data.Password);
            if (!createdUser.Succeeded)
            {
                response.Errors.Add("Something went wrong while creating your User.");
                return response;
            }
            var user = await _userManager.FindByEmailAsync(data.Email);
            if (user == null)
            {
                response.Errors.Add("Something went wrong while creating your User.");
                return response;
            }
            await _userManager.AddToRoleAsync(user, "User");
            return response;
        }
    }
}