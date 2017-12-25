using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class Acc
    {
    [Key]
    public int AccId { get; set; }

    [Required]
    public string AccConnectionString { get; set; }

    [Required]
    public string ImageBase64String { get; set; }
    }
}
