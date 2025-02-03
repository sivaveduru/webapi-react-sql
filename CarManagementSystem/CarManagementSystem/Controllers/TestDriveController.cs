using CarManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestDriveController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TestDriveController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/TestDrive
        [HttpPost]
        public async Task<IActionResult> PostTestDriveRequest([FromBody] TestDriveRequest testDriveRequest)
        {
            if (testDriveRequest == null)
            {
                return BadRequest("Invalid data.");
            }

            // Add to the database
            _context.TestDriveRequests.Add(testDriveRequest);
            await _context.SaveChangesAsync();

            // Send a thank you message (you can return a response or email confirmation here)
            return Ok(new { message = "Test Drive Request Submitted Successfully!" });
        }

        // GET: api/TestDrive
        [HttpGet]
        public async Task<IActionResult> GetTestDriveRequests()
        {
            // Retrieve all test drive requests from the database
            var testDriveRequests = await _context.TestDriveRequests.ToListAsync();

            // Check if no data exists
            if (testDriveRequests == null || !testDriveRequests.Any())
            {
                return NotFound("No test drive requests found.");
            }

            // Return the data
            return Ok(testDriveRequests);
        }
    }
}
