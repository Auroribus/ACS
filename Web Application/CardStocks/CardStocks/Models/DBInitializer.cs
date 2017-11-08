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
        new Card { CardName="CardTest", CardRarity="Common", CardSet="1"},
        new Card { CardName="CardNur2", CardRarity="Uncommon", CardSet="2"}
        );

      context.SaveChanges();
        }
    }
}
