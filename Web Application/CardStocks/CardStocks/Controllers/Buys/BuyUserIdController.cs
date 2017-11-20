using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CardStocks.Models;

namespace CardStocks.Controllers.Buys
{
    [Produces("application/json")]
    [Route("api/BuyUserId")]
    public class BuyUserIdController : Controller
    {
        private readonly CSContext _context;

        public BuyUserIdController(CSContext context)
        {
            _context = context;
        }

        // GET: api/BuyUserId/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBuyModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var buyModel = await _context.BuyListings.SingleOrDefaultAsync(m => m.UserId == id);

            if (buyModel == null)
            {
                return NotFound();
            }

            return Ok(buyModel);
        }    

        private bool BuyModelExists(int id)
        {
            return _context.BuyListings.Any(e => e.BuyId == id);
        }
    }
}
