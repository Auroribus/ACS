using System.ComponentModel.DataAnnotations;


namespace CardStocks.Models
{
    public class Chatroom
    {
      [Key]
      public int ChatroomId { get; set; }

      [Required]
      public int UserOneId { get; set; }
      [Required]
      public int UserTwoId { get; set; }

      [Required]
      public string UserOneName{ get; set; }
      [Required]
      public string UserTwoName { get; set; }
    }
}
