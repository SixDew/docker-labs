using DockerLab2;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(opts => opts.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapGet("/{userId:int}", async (int userId, ApplicationDbContext db) =>
{
    var user = await db.Users.FirstOrDefaultAsync(x => x.Id == userId);
    if (user is null)
    {
        return Results.BadRequest("User is not exist");
    }
    Console.WriteLine("Id" + user.Id);
    Console.WriteLine("Count" + user.Count);
    return Results.Ok(user);
});
app.MapPost("/{userId:int}", async (int userId, ApplicationDbContext db) =>
{
    var user = await db.Users.FirstOrDefaultAsync(x => x.Id == userId);
    if (user is not null)
    {
        return Results.BadRequest("User already exist");
    }
    user = new UserModel
    {
        Count = 0
    };
    await db.Users.AddAsync(user);
    await db.SaveChangesAsync();
    return Results.Created($"/{user!.Id}", user);
});
app.MapPut("/{userId:int}", async (int userId, ApplicationDbContext db, int count) =>
{
    var user = await db.Users.FirstOrDefaultAsync(x => x.Id == userId);
    if (user is null)
    {
        return Results.BadRequest("User is not exist");
    }
    user.Count = count;
    await db.SaveChangesAsync();
    return Results.Ok(user);
});

app.Run();
