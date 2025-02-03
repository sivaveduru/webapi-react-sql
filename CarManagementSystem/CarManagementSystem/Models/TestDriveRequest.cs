namespace CarManagementSystem.Models
{
    public class TestDriveRequest
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? CarModel { get; set; }
        public DateTime PreferredDate { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.Now; 

    }
}
