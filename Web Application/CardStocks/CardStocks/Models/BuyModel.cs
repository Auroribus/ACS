using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class BuyModel
    {
        [Key]
        public int BuyId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string CardName { get; set; }
        [Required]
        public string CardSet { get; set; }
        [Required]
        public string CardCondition { get; set; }
        [Required]
        public double BuyPrice { get; set; }
    }
}
