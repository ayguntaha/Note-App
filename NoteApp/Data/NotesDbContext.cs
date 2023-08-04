using Microsoft.EntityFrameworkCore;
using NoteApp.Models.Entities;

namespace NoteApp.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions options) : base(options)
        {
        }
    
        public DbSet<Note> Notes { get; set; }
    
    }
}
