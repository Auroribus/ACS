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
        public int CardId { get; set; }
    
        public string CardName { get; set; }
    
        public string CardSet { get; set; }

        public string CardCondition { get; set; }
    
        public UserModel User { get; set; }
    }
}
