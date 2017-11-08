using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CardStocks.Models
{
    public class CSContext: DbContext
    {
        public CSContext(DbContextOptions<CSContext> options):base(options)
        {
            
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<Collection> Collections { get; set; }
    
        
    }
}
