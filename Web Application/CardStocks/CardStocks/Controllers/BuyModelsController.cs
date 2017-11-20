using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CardStocks.Models;

namespace CardStocks.Controllers
{
    [Produces("application/json")]
    [Route("api/BuyList")]
    public class BuyModelsController : Controller
    {
        private readonly CSContext _context;

        public BuyModelsController(CSContext context)
        {
            _context = context;
        }

        // GET: api/BuyModels
        [HttpGet]
        public IEnumerable<BuyModel> GetBuyListings()
        {
          return _context.BuyListings;
        }

        // GET: api/BuyModels/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBuyModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var buyModel = await _context.BuyListings.SingleOrDefaultAsync( m => m.BuyId == id);

            if (buyModel == null)
            {
                return NotFound();
            }

            return Ok(buyModel);
        }

        // PUT: api/BuyModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBuyModel([FromRoute] int id, [FromBody] BuyModel buyModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != buyModel.BuyId)
            {
                return BadRequest();
            }

            _context.Entry(buyModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BuyModelExists(id))
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

        // POST: api/BuyModels
        [HttpPost]
        public async Task<IActionResult> PostBuyModel([FromBody] BuyModel buyModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.BuyListings.Add(buyModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBuyModel", new { id = buyModel.BuyId }, buyModel);
        }

        // DELETE: api/BuyModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBuyModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var buyModel = await _context.BuyListings.SingleOrDefaultAsync(m => m.BuyId == id);
            if (buyModel == null)
            {
                return NotFound();
            }

            _context.BuyListings.Remove(buyModel);
            await _context.SaveChangesAsync();

            return Ok(buyModel);
        }

        private bool BuyModelExists(int id)
        {
            return _context.BuyListings.Any(e => e.BuyId == id);
        }
    }
}
