using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using src.Domain;

namespace src.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, string>
    {
        public AppDbContext(DbContextOptions options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasData(
                new User
                {
                    Id = "123",
                    UserName = "sudo",
                    Email = "sudo@gmail.com",
                    PasswordHash = "123456",
                    ConcurrencyStamp = "poto",
                    SecurityStamp = "poto"
                }
            );

            builder.Entity<Role>().HasData(
                new Role
                {
                    Id = "321",
                    Name = "sudo",
                    NormalizedName = "SUDO"
                }
            );


            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    UserId = "123",
                    RoleId = "321"
                }
            );

            base.OnModelCreating(builder);
        }
        public DbSet<User> Userss { get; set; } = null!;


    }
}