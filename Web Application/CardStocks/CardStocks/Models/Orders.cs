using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
  public class Orders
  {
    [Key]
    public int OrderId { get; set; }

    [Required]
    public int SellerId { get; set; }

    [Required]
    public int BuyerId { get; set; }

    [Required]
    public double Price { get; set; }

    [Required]
    public string Status { get; set; }


  }
}
