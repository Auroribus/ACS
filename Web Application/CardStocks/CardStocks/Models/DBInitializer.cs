using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardStocks.Models
{
    public class DBInitializer
    {
        public static void Initialize(CSContext context)
        {
      context.Database.EnsureCreated();

      if(context.Cards.Any())
      {
        return;
      }

      context.Cards.AddRange(
        new Card { CardName="CardTest", CardSet="1"},
        new Card { CardName="CardNur2", CardSet="2"}
      );

      context.UserList.Add(new UserModel { Username="Admin", Email="test@mail.com", Password="testPassword1"});

      context.BuyListings.Add(new BuyModel { CardID=1, UserID=1, CardName="CardTest", BuyPrice=3.14});

      context.SellListings.Add(new SellModel { CardID = 2, CardName="CardNur2", UserID = 1, SellPrice = 5.01 });

      context.Collections.Add(new Collection { CollectionName="testCollection", CollectionNumber=1.001, UserID=1 });

      context.SaveChanges();
        }
    }
}
