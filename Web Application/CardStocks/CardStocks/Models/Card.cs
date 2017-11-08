using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CardStocks.Models
{
    public class Card
    {
        [Key]
        public int CardID { get; set; }

        public string CardName { get; set; }

        public string CardSet { get; set; }

        public string CardRarity { get; set; }
    }
}
