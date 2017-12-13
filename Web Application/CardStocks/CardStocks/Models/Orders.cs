using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
  public class Orders
  {
    [Key]
    public int OrderId { get; set; }
    public int SellerId { get; set; }
    public int BuyerId { get; set; }
    public int CardId { get; set; }
    public double Price { get; set; }
    public string Status { get; set; }
  }
}
