using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CardStocks.Models
{
    public class WishList
    {
    [Key]
    public int WishListId { get; set; }
    public int UserId { get; set; }
    public int CollectionId { get; set; }
  }
}
