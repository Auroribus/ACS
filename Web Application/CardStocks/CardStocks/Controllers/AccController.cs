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
    [Route("api/Acc")]
    public class AccController : Controller
    {
        private readonly CSContext _context;

        public AccController(CSContext context)
        {
            _context = context;
        }

        // GET: api/Acc
        [HttpGet]
        public IEnumerable<Acc> GetAcc()
        {
            return _context.Acc;
        }

        // GET: api/Acc/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAcc([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var acc = await _context.Acc.SingleOrDefaultAsync(m => m.AccId == id);

            if (acc == null)
            {
                return NotFound();
            }

            return Ok(acc);
        }

        // PUT: api/Acc/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcc([FromRoute] int id, [FromBody] Acc acc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != acc.AccId)
            {
                return BadRequest();
            }

            _context.Entry(acc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccExists(id))
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

        // POST: api/Acc
        [HttpPost]
        public async Task<IActionResult> PostAcc([FromBody] Acc acc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Acc.Add(acc);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcc", new { id = acc.AccId }, acc);
        }

        // DELETE: api/Acc/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcc([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var acc = await _context.Acc.SingleOrDefaultAsync(m => m.AccId == id);
            if (acc == null)
            {
                return NotFound();
            }

            _context.Acc.Remove(acc);
            await _context.SaveChangesAsync();

            return Ok(acc);
        }

        private bool AccExists(int id)
        {
            return _context.Acc.Any(e => e.AccId == id);
        }
    }
}