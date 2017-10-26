using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardStocksWebsite.Models
{
    public class Card
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Set { get; set; }
        public string Rarity { get; set; }
        public string Color { get; set; }
        public double Recommended_Price { get; set; }
        public string Condition { get; set; }
        public string Ability { get; set; }
    }
}
