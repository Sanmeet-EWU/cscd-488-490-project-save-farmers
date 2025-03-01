using FarmerAPI.Domain.Entities;

namespace FarmerAPI.Service
{
    public interface ITokenService
    {
        Task<string> GenerateToken(User user);
        string GenerateRefreshToken();
    }
}
