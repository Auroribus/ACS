using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CardStocks.Models;

namespace CardStocks.Controllers
{
    [Produces("application/json")]
    [Route("api/SellList")]
    public class SellModelsController : Controller
    {
        private readonly CSContext _context;

        public SellModelsController(CSContext context)
        {
            _context = context;
        }

        // GET: api/SellModels
        [HttpGet]
        public IEnumerable<SellModel> GetSellListings()
        {
            return _context.SellListings;
        }

        // GET: api/SellModels/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSellModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sellModel = await _context.SellListings.SingleOrDefaultAsync(m => m.SellId == id);

            if (sellModel == null)
            {
                return NotFound();
            }

            return Ok(sellModel);
        }

        // PUT: api/SellModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSellModel([FromRoute] int id, [FromBody] SellModel sellModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sellModel.SellId)
            {
                return BadRequest();
            }

            _context.Entry(sellModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SellModelExists(id))
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

        // POST: api/SellModels
        [HttpPost]
        public async Task<IActionResult> PostSellModel([FromBody] SellModel sellModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SellListings.Add(sellModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSellModel", new { id = sellModel.SellId }, sellModel);
        }

        // DELETE: api/SellModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSellModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sellModel = await _context.SellListings.SingleOrDefaultAsync(m => m.SellId == id);
            if (sellModel == null)
            {
                return NotFound();
            }

            _context.SellListings.Remove(sellModel);
            await _context.SaveChangesAsync();

            return Ok(sellModel);
        }

        private bool SellModelExists(int id)
        {
            return _context.SellListings.Any(e => e.SellId == id);
        }
    }
}
