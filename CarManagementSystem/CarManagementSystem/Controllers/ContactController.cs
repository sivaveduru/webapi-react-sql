using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CarManagementSystem.Models; // Make sure to include the namespace for ContactFormMessage
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Contact
        [HttpPost]
        public async Task<IActionResult> SubmitMessage([FromBody] ContactFormMessage message)
        {
            if (message == null || string.IsNullOrEmpty(message.Name) || string.IsNullOrEmpty(message.Email) || string.IsNullOrEmpty(message.Message))
            {
                return BadRequest("Invalid message data.");
            }

            _context.ContactFormMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message received successfully. Thank you!" });
        }

        // GET: api/Contact
        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            // Retrieve all contact form messages from the database
            var messages = await _context.ContactFormMessages.ToListAsync();

            // Check if no data exists
            if (messages == null || !messages.Any())
            {
                return NotFound("No messages found.");
            }

            // Return the data
            return Ok(messages);
        }
    }
}
