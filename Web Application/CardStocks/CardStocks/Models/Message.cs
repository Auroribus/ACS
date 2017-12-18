using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class Message
    {
      [Key]
      public int MessageId { get; set; }

      [Required]
      public int ChatroomId { get; set; }

      [Required]
      public int UserOneId { get; set; }
      [Required]
      public int UserTwoId { get; set; }

      [Required]
      public string MsgString { get; set; }
    }
}
