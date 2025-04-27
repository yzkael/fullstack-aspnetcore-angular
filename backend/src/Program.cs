using src.Data;
using src.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContextConfig(builder.Configuration);
builder.Services.AddIdentityConfig();
builder.Services.AddDependencyInjections();
builder.Services.AddAuthenticationConfig(builder.Configuration);
builder.Services.AddAuthorizationConfig();
builder.Services.AddCorsConfig();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

await app.InitialiseDatabaseAsync();

app.UseHttpsRedirection();
app.UseCors("Default");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
