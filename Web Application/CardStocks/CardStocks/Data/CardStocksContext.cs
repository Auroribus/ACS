using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CardStocks.Models
{
    public class CardStocksContext : DbContext
    {
        public CardStocksContext (DbContextOptions<CardStocksContext> options)
            : base(options)
        {
        }

        public DbSet<CardStocks.Models.Card> Card { get; set; }
    }
}
