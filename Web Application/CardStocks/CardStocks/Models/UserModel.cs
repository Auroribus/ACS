using System.ComponentModel.DataAnnotations;

namespace CardStocks.Models
{
    public class UserModel
    {
        [Key]
        public int UserId { get; set; }    
        public string Username { get; set; }    
        public string Email { get; set; }    
        public string Password { get; set; }
        public int AmountOfSales { get; set; }
        public double Rating { get; set; }
        public string DateOfCreation { get; set; }
        public int StoreCredit { get; set; }
        public string Membership { get; set; }
    }
}
