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
    [Route("api/Chatroom")]
    public class ChatroomController : Controller
    {
        private readonly CSContext _context;

        public ChatroomController(CSContext context)
        {
            _context = context;
        }

        // GET: api/Chatroom
        [HttpGet]
        public IEnumerable<Chatroom> GetChatroom()
        {
            return _context.Chatroom;
        }

        // GET: api/Chatroom/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChatroom([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chatroom = await _context.Chatroom.SingleOrDefaultAsync(m => m.ChatroomId == id);

            if (chatroom == null)
            {
                return NotFound();
            }

            return Ok(chatroom);
        }

        // PUT: api/Chatroom/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChatroom([FromRoute] int id, [FromBody] Chatroom chatroom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != chatroom.ChatroomId)
            {
                return BadRequest();
            }

            _context.Entry(chatroom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChatroomExists(id))
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

        // POST: api/Chatroom
        [HttpPost]
        public async Task<IActionResult> PostChatroom([FromBody] Chatroom chatroom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Chatroom.Add(chatroom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChatroom", new { id = chatroom.ChatroomId }, chatroom);
        }

        // DELETE: api/Chatroom/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChatroom([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chatroom = await _context.Chatroom.SingleOrDefaultAsync(m => m.ChatroomId == id);
            if (chatroom == null)
            {
                return NotFound();
            }

            _context.Chatroom.Remove(chatroom);
            await _context.SaveChangesAsync();

            return Ok(chatroom);
        }

        private bool ChatroomExists(int id)
        {
            return _context.Chatroom.Any(e => e.ChatroomId == id);
        }
    }
}