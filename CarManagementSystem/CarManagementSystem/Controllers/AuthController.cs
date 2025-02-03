using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using CarManagementSystem.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Register user and store password as it is (without hashing)
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
        if (existingUser != null)
            return BadRequest("User already exists");

        // Store the password as it is (without hashing)
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "User registered successfully" });
    }


    // Login user and directly compare passwords (no hashing/verification)
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User loginUser)
    {
        // Find the user by email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginUser.Email);

        // If user is not found or passwords don't match
        if (user == null || user.Password != loginUser.Password)
        {
            return Unauthorized("Invalid email or password");
        }

        // Return a simple success message if login is successful
        return Ok(new { message = "Login successful", user });
    }
}
