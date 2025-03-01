using FarmerAPI.Domain.Contracts;

namespace FarmerAPI.Service
{
    public interface IPostService
    {
        Task<PostResponse> CreatePostAsync(PostRequest request);
        Task<IEnumerable<PostResponse>> GetAllPostsAsync();
        Task<IEnumerable<PostResponse>> GetAllPostsAnalytic();
        Task<IEnumerable<PostResponse>> GetAllPostsByUserIdAsync(Guid userId);
        Task<PostResponse> UpdatePostAsync(Guid postId, PostRequest request);
        Task DeletePostAsync(Guid postId);
    }
}
