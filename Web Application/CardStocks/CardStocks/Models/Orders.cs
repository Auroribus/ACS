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
    public int CardId { get; set; }
    [Required]
    public double Price { get; set; }
    [Required]
    public string Status { get; set; }

    public string NameSeller { get; set; }
    public string NameBuyer { get; set; }


    public double RatingSeller { get; set; }
    public double RatingBuyer { get; set; }

    public string CardName { get; set; }
    public string CardSet { get; set; }
  }
}
