namespace FarmerAPI.Domain.Entities
{
    public class Post
    {
        public Guid PostId { get; set; } // Unique identifier for the post
        public string Title { get; set; }
        public string Price { get; set; }
        public string CropType { get; set; }
        public string Amount { get; set; }
        public string Location { get; set; }
        public string Contact { get; set; }
        public string? Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime ExpireDate { get; set; }
        public string Name { get; set; }

        public string Status { get; set; } // Active, Inactive, expired
        public Guid UserId { get; set; } // Foreign key to connect the post to a user
    }
}
