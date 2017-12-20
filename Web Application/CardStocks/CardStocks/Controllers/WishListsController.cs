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
    [Route("api/WishLists")]
    public class WishListsController : Controller
    {
        private readonly CSContext _context;

        public WishListsController(CSContext context)
        {
            _context = context;
        }

        // GET: api/WishLists
        [HttpGet]
        public IEnumerable<WishList> GetWishList()
        {
            return _context.WishList;
        }

        // GET: api/WishLists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWishList([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wishList = await _context.WishList.SingleOrDefaultAsync(m => m.WishListId == id);

            if (wishList == null)
            {
                return NotFound();
            }

            return Ok(wishList);
        }

        // PUT: api/WishLists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishList([FromRoute] int id, [FromBody] WishList wishList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != wishList.WishListId)
            {
                return BadRequest();
            }

            _context.Entry(wishList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishListExists(id))
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

        // POST: api/WishLists
        [HttpPost]
        public async Task<IActionResult> PostWishList([FromBody] WishList wishList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.WishList.Add(wishList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishList", new { id = wishList.WishListId }, wishList);
        }

        // DELETE: api/WishLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishList([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wishList = await _context.WishList.SingleOrDefaultAsync(m => m.WishListId == id);
            if (wishList == null)
            {
                return NotFound();
            }

            _context.WishList.Remove(wishList);
            await _context.SaveChangesAsync();

            return Ok(wishList);
        }

        private bool WishListExists(int id)
        {
            return _context.WishList.Any(e => e.WishListId == id);
        }
    }
}