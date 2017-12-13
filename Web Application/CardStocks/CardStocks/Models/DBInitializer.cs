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
            
      context.SaveChanges();
        }
    }
}
