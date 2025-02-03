using CarManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Car> Cars { get; set; }
    public DbSet<ContactFormMessage> ContactFormMessages { get; set; }
    public DbSet<TestDriveRequest> TestDriveRequests { get; set; }

}
