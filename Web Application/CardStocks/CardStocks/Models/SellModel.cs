using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CardStocks.Models
{
    public class SellModel
    {
    [Key]
    public int SellId { get; set; }
    
    public UserModel User { get; set; }
    
    public Card Card { get; set; }

    public double SellPrice { get; set; }
  }
}
