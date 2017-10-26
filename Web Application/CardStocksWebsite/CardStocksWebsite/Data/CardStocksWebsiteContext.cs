using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CardStocksWebsite.Models
{
    public class CardStocksWebsiteContext : DbContext
    {
        public CardStocksWebsiteContext (DbContextOptions<CardStocksWebsiteContext> options)
            : base(options)
        {
        }

        public DbSet<CardStocksWebsite.Models.Card> Card { get; set; }
    }
}
