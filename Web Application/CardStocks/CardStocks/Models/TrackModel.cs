using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class TrackModel
    {
    [Key]
    public int TrackId { get; set; }

    [Required]
    public int UserId { get; set; }

    }
}
