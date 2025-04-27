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
            builder.Entity<Role>()
            .Property(r => r.Id).ValueGeneratedOnAdd();

            builder.Entity<User>()
            .Property(u => u.Id)
            .ValueGeneratedOnAdd();
            base.OnModelCreating(builder);

        }


    }
}