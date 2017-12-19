using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class UserModel
    {
    [Key]
    public int UserId { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public int AmountOfSales { get; set; }
    [Required]
    public double Rating { get; set; }
    [Required]
    public string DateOfCreation { get; set; }
    [Required]
    public int StoreCredit { get; set; }

    //public string Base64ProfileImage { get; set; }
    }
}
