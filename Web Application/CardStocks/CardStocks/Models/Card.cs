using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class Card
    {
        [Key]
        public int CardId { get; set; }

        [Required]
        public string CardName { get; set; }

        [Required]
        public string CardSet { get; set; }

        public string CardCondition { get; set; }

        [Required]
        public int UserId { get; set; }

        public string ImgBase64 { get; set; }
    }
}
