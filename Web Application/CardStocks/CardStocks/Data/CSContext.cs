using Microsoft.EntityFrameworkCore;
using CardStocks.Models;

namespace CardStocks.Models
{
    public class CSContext: DbContext
    {
        public CSContext(DbContextOptions<CSContext> options):base(options)
        {
            
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<Collection> Collections { get; set; }
        public DbSet<BuyModel> BuyListings { get; set; }
        public DbSet<SellModel> SellListings { get; set; }
        public DbSet<UserModel> UserList { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<WishList> WishLists { get; set; }
        public DbSet<WishCard> WishCards { get; set; }

        public DbSet<Membership> Membership { get; set; }
        public DbSet<CardStocks.Models.Chatroom> Chatroom { get; set; }
        public DbSet<CardStocks.Models.Message> Message { get; set; }

}
