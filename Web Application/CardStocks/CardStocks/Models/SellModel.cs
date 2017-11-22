using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class SellModel
    {
    [Key]
    public int SellId { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public int CardId { get; set; }

    [Required]
    public string CardName { get; set; }

    [Required]
    public double SellPrice { get; set; }
  }
}
