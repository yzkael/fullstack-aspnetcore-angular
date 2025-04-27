using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using src.Domain;

namespace src.Data
{
    public static class InitialiserExtension
    {
        public static async Task InitialiseDatabaseAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var initialiser = scope.ServiceProvider.GetRequiredService<AppDbInitialiser>();
            await initialiser.InitialiseAsync();
        }
    }

    public class AppDbInitialiser
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public AppDbInitialiser(AppDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                // Apply pending migrations
                var pendingMigrations = await _context.Database.GetPendingMigrationsAsync();

                if (pendingMigrations.Any())
                {
                    await _context.Database.MigrateAsync();
                }

                // Seed data after migrations
                await SeedAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Initialization failed: {ex}");
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Seeding failed: {ex}");
                throw;
            }
        }

        public async Task TrySeedAsync()
        {

            // Create role first
            var newRole = new Role
            {
                Name = "sudo",
                NormalizedName = "SUDO"
            };
            if (await _roleManager.FindByNameAsync(newRole.Name) == null)
            {
                var createRoleResult = await _roleManager.CreateAsync(newRole);
                if (!createRoleResult.Succeeded)
                {
                    throw new Exception($"Role creation failed: {string.Join(", ", createRoleResult.Errors.Select(e => e.Description))}");
                }
            }
            // Create user
            var newUser = new User
            {
                UserName = "sudo",
                NormalizedUserName = "SUDO",
                Email = "sudo@gmail.com",
                NormalizedEmail = "SUDO@GMAIL.COM",
                EmailConfirmed = true // Important for some scenarios
            };
            if (await _userManager.FindByNameAsync(newUser.UserName) == null)
            {
                var createUserResult = await _userManager.CreateAsync(newUser, "Ismael5982!");
                if (!createUserResult.Succeeded)
                {
                    throw new Exception($"User creation failed: {string.Join(", ", createUserResult.Errors.Select(e => e.Description))}");
                }
                // Assign role to user
                var user = await _userManager.FindByNameAsync(newUser.UserName);
                var addToRoleResult = await _userManager.AddToRoleAsync(user!, newRole.Name);
                if (!addToRoleResult.Succeeded)
                {
                    throw new Exception($"Role assignment failed: {string.Join(", ", addToRoleResult.Errors.Select(e => e.Description))}");
                }
            }
        }
    }
}