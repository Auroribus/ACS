using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CardStocks.Models;

namespace CardStocks.Controllers.Cards
{
    [Produces("application/json")]
    [Route("api/CardNames")]
    public class CardNamesController : Controller
    {
        private readonly CSContext _context;

        public CardNamesController(CSContext context)
        {
            _context = context;
        }
    
        // GET: api/CardNames/5
        [HttpGet("{name}")]
        public async Task<IActionResult> GetCard([FromRoute] string name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var card = await _context.Cards.SingleOrDefaultAsync(m => m.CardName.Contains(name));

            if (card == null)
            {
                return NotFound();
            }

            return Ok(card);
        }

    
        private bool CardExists(int id)
        {
            return _context.Cards.Any(e => e.CardId == id);
        }
    }
}
