using Microsoft.AspNetCore.Identity;
using System.Data;

namespace FarmerAPI.Domain.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string ? RefreshToken { get; set; }
        public DateTime ? RefreshTokenExpiryTime { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
