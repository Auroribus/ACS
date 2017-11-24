using System.Linq;

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
        new Card { CardName="Lotus Petal", CardSet="Tempest", CardCondition="NM"},
        new Card { CardName="Divination", CardSet="Magic 2015", CardCondition="NM"}
      );
            
      context.SaveChanges();
        }
    }
}
