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

      context.SaveChanges();
        }
    }
}
