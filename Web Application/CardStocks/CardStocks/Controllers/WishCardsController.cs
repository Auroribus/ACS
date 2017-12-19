using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CardStocks.Models;

namespace CardStocks.Controllers
{
    [Produces("application/json")]
    [Route("api/WishCards")]
    public class WishCardsController : Controller
    {
        private readonly CSContext _context;

        public WishCardsController(CSContext context)
        {
            _context = context;
        }

        // GET: api/WishCards
        [HttpGet]
        public IEnumerable<WishCard> GetWishCards()
        {
            return _context.WishCards;
        }

        // GET: api/WishCards/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWishCard([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wishCard = await _context.WishCards.SingleOrDefaultAsync(m => m.WishCardId == id);

            if (wishCard == null)
            {
                return NotFound();
            }

            return Ok(wishCard);
        }

        // PUT: api/WishCards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishCard([FromRoute] int id, [FromBody] WishCard wishCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != wishCard.WishCardId)
            {
                return BadRequest();
            }

            _context.Entry(wishCard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishCardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WishCards
        [HttpPost]
        public async Task<IActionResult> PostWishCard([FromBody] WishCard wishCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.WishCards.Add(wishCard);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishCard", new { id = wishCard.WishCardId }, wishCard);
        }

        // DELETE: api/WishCards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishCard([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wishCard = await _context.WishCards.SingleOrDefaultAsync(m => m.WishCardId == id);
            if (wishCard == null)
            {
                return NotFound();
            }

            _context.WishCards.Remove(wishCard);
            await _context.SaveChangesAsync();

            return Ok(wishCard);
        }

        private bool WishCardExists(int id)
        {
            return _context.WishCards.Any(e => e.WishCardId == id);
        }
    }
}