using Microsoft.EntityFrameworkCore;

namespace DockerLab2
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<UserModel> Users { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserModel>().HasData(new UserModel
            {
                Id = 1,
                Count = 0
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var dbVariables = new DbVariables();
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseNpgsql($"Host={dbVariables.DbHost};Port={dbVariables.DbPort};Database={dbVariables.DbName};Username={dbVariables.DbUser};Password={dbVariables.DbPassword}");
        }
    }

    public class DbVariables
    {
        public string DbHost { get; } = Environment.GetEnvironmentVariable("db_host")!;
        public string DbPort { get; } = Environment.GetEnvironmentVariable("db_port")!;
        public string DbName { get; } = Environment.GetEnvironmentVariable("db_name")!;
        public string DbUser { get; } = Environment.GetEnvironmentVariable("db_user")!;
        public string DbPassword { get; } = Environment.GetEnvironmentVariable("db_password")!;
    }
}
