using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class Collection
    {
        [Key]
        public int CollectionId { get; set; }
    
        public double CollectionSortingNumber { get; set; }
    
        public string CollectionName { get; set; }
    
        public int UserId { get; set; }
    
        public int CardId { get; set; }

  }
}
