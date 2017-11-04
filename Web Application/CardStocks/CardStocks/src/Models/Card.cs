using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CardStocks.src.Models
{
    public class Card
    {
      public int ID { get; set; }
      public string Name { get; set; }
      public string Set { get; set; }
      public string Rarity { get; set; }
    }
}
