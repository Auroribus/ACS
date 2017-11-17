using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Identity;

namespace CardStocks.Models
{
    public class UserModel
    {
        [Key]
        public int UserId { get; set; }
    
        public string Username { get; set; }

        public string Email { get; set; }
    
        public string Password { get; set; }
    }
}
