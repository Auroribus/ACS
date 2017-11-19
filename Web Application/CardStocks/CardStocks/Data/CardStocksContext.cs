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
