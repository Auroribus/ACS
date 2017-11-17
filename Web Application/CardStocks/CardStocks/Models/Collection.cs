using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CardStocks.Models
{
    public class Collection
    {
        [Key]
        public int CollectionId { get; set; }
    
        public double CollectionSortingNumber { get; set; }
    
        public string CollectionName { get; set; }
    
        public UserModel User { get; set; }
    
        public List<Card> CardsInCollection { get; set; }

  }
}
