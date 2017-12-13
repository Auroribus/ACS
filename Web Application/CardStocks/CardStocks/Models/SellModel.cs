using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class SellModel
    {
    [Key]
    public int SellId { get; set; }    
    public int UserId { get; set; }
    public int CardId { get; set; }
    public string CardName { get; set; }
    public double SellPrice { get; set; }
  }
}
