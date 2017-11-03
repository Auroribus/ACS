using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CardStocks.src.Models
{
    public class Card
    {
      [Key]
      public int id { get; set; }
      public string name { get; set; }
      public string set { get; set; }
      public string rarity { get; set; }
    }
}
