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

    public string UserName { get; set; }
    public string Rating { get; set; }

    public string CardSet { get; set; }
    public string CardCondition { get; set; }
  }
}
