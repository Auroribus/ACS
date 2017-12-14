using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class Collection
    {
        [Key]
        public int CollectionId { get; set; }
        [Required]
        public double CollectionSortingNumber { get; set; }
        [Required]
        public string CollectionName { get; set; }
        [Required]
        public int UserId { get; set; }
       
        public int CardId { get; set; }
  }
}
