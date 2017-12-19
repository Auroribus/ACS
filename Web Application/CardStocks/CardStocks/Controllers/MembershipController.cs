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
    [Route("api/Membership")]
    public class MembershipController : Controller
    {
        private readonly CSContext _context;

        public MembershipController(CSContext context)
        {
            _context = context;
        }

        // GET: api/Membership
        [HttpGet]
        public IEnumerable<Membership> GetMembership()
        {
            return _context.Membership;
        }

        // GET: api/Membership/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMembership([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var membership = await _context.Membership.SingleOrDefaultAsync(m => m.MembershipId == id);

            if (membership == null)
            {
                return NotFound();
            }

            return Ok(membership);
        }

        // PUT: api/Membership/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMembership([FromRoute] int id, [FromBody] Membership membership)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != membership.MembershipId)
            {
                return BadRequest();
            }

            _context.Entry(membership).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembershipExists(id))
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

        // POST: api/Membership
        [HttpPost]
        public async Task<IActionResult> PostMembership([FromBody] Membership membership)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Membership.Add(membership);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMembership", new { id = membership.MembershipId }, membership);
        }

        // DELETE: api/Membership/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMembership([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var membership = await _context.Membership.SingleOrDefaultAsync(m => m.MembershipId == id);
            if (membership == null)
            {
                return NotFound();
            }

            _context.Membership.Remove(membership);
            await _context.SaveChangesAsync();

            return Ok(membership);
        }

        private bool MembershipExists(int id)
        {
            return _context.Membership.Any(e => e.MembershipId == id);
        }
    }
}