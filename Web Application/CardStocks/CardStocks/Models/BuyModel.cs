using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CardStocks.Models
{
    public class BuyModel
    {
        [Key]
        public int BuyID { get; set; }

        [Required]
        public int UserID { get; set; }

        [Required]
        public Card CardID { get; set; }

        [Required]
        public double BuyPrice { get; set; }
    }
}
