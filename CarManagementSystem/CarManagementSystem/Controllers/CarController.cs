using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarManagementSystem.Models;

[Route("api/[controller]")]
[ApiController]
public class CarController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    // Constructor injection for DbContext
    public CarController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST: api/Car/add
    [HttpPost("add")]
    public async Task<IActionResult> AddCar([FromBody] Car car)
    {
        if (car == null)
        {
            return BadRequest("Car data is null");
        }

        // Add the car to the database
        _context.Cars.Add(car);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Car added successfully", car });
    }

    [HttpGet]
    public async Task<IActionResult> GetCars()
    {
        try
        {
            var cars = await _context.Cars.ToListAsync();
            return Ok(cars);
        }
        catch (Exception ex)
        {
            // Log the error for debugging purposes
            return StatusCode(500, "Internal server error");
        }
    }

    // GET: api/Car/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCarById(int id)
    {
        // Get a car by its ID
       
        // Correct usage with navigation property
        var car = await _context.Cars
                                .FirstOrDefaultAsync(c => c.Id == id);


        if (car == null)
        {
            return NotFound(new { message = "Car not found" });
        }

        return Ok(car);
    }

    // PUT: api/Car/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCar(int id, [FromBody] Car updatedCar)
    {
        if (updatedCar == null)
        {
            return BadRequest("Updated car data is null");
        }

        // Find the car in the database
        var car = await _context.Cars.FindAsync(id);
        if (car == null)
        {
            return NotFound("Car not found");
        }

        // Update car details
        car.Make = updatedCar.Make;
        car.Model = updatedCar.Model;
        car.Year = updatedCar.Year;
        car.Price = updatedCar.Price;

        _context.Cars.Update(car);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Car updated successfully" });
    }

    // DELETE: api/Car/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCar(int id)
    {
        // Find the car in the database
        var car = await _context.Cars.FindAsync(id);
        if (car == null)
        {
            return NotFound("Car not found");
        }

        // Delete the car from the database
        _context.Cars.Remove(car);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Car deleted successfully" });
    }
}
