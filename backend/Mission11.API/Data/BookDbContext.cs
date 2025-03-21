using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Books> Books { get; set; }
}