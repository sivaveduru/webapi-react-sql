// ContactFormMessage.cs
namespace CarManagementSystem.Models
{
    public class ContactFormMessage
    {
        public int Id { get; set; } // Primary Key
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.Now; // Automatically set when message is submitted
    }
}
