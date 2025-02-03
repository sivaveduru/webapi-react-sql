﻿public class Car
{
    public int Id { get; set; }
    public string? Make { get; set; }
    public string? Model { get; set; }
    public int Year { get; set; }
    public decimal Price { get; set; }
    public int DealerID { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.Now;
}
