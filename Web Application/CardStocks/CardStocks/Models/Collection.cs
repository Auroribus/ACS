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
        public int CollectionID { get; set; }

        [Required]
        public double CollectionNumber { get; set; }

        [Required]
        public string CollectionName { get; set; }
            
        [Required]
        public int UserID { get; set; }
    
        public Card CardsInCollection { get; set; }

  }
}
