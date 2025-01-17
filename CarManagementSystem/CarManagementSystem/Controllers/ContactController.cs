using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CarManagementSystem.Models; // Make sure to include the namespace for ContactFormMessage

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

    }
}
