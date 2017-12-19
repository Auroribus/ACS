using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardStocks.Models
{
    public class WishCard
    {
    public int WishCardId { get; set; }
    public int WishListId { get; set; }
    public string CardName { get; set; }
    public string CardSet { get; set; }
    public string CardCondition { get; set; }
    public string ImgUrl { get; set; }
  }
}
