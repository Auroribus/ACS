using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class Membership
    {
      [Key]
      public int MembershipId { get; set; }

      [Required]
      public int UserId { get; set; }

      [Required]
      public string MemberStatus { get; set; }
    
    //member end date

    }
}
