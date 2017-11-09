using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CardStocks.Models
{
    public class SellModel
    {
        [Key]
        public int SellID { get; set; }

        [Required]
        public int UserID { get; set; }

        [Required]
        public Card CardID { get; set; }

        [Required]
        public double SellPrice { get; set; }
    }
}
