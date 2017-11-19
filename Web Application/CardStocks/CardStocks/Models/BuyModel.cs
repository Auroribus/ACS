using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class BuyModel
    {
        [Key]
        public int BuyId { get; set; }
    
        public int UserId { get; set; }

        public string CardName { get; set; }

        public string CardSet { get; set; }

        public string CardCondition { get; set; }
    
        public double BuyPrice { get; set; }
    }
}
