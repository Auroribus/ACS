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
    [Route("api/User")]
    public class UserModelsController : Controller
    {
        private readonly CSContext _context;

        public UserModelsController(CSContext context)
        {
            _context = context;
        }

        // GET: api/UserModels
        [HttpGet]
        public IEnumerable<UserModel> GetUserList()
        {
            return _context.UserList;
        }

        // GET: api/UserModels/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userModel = await _context.UserList.SingleOrDefaultAsync(m => m.UserID == id);

            if (userModel == null)
            {
                return NotFound();
            }

            return Ok(userModel);
        }

        // PUT: api/UserModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel([FromRoute] int id, [FromBody] UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userModel.UserID)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
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

        // POST: api/UserModels
        [HttpPost]
        public async Task<IActionResult> PostUserModel([FromBody] UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.UserList.Add(userModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserModel", new { id = userModel.UserID }, userModel);
        }

        // DELETE: api/UserModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userModel = await _context.UserList.SingleOrDefaultAsync(m => m.UserID == id);
            if (userModel == null)
            {
                return NotFound();
            }

            _context.UserList.Remove(userModel);
            await _context.SaveChangesAsync();

            return Ok(userModel);
        }

        private bool UserModelExists(int id)
        {
            return _context.UserList.Any(e => e.UserID == id);
        }
    }
}
