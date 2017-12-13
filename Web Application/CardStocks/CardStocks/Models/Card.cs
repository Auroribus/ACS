using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class Card
    {
        [Key]
        public int CardId { get; set; }
        public string CardName { get; set; }
        public string CardSet { get; set; }
        public string CardCondition { get; set; }
        public int UserId { get; set; }
        public string ImgBase64 { get; set; }
    }
}
