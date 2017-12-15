using System.Collections.Generic;
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
        [Required]
        public string CardCondition { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string ImgBase64 { get; set; }

        public int CollectionId { get; set; }
    }
}
