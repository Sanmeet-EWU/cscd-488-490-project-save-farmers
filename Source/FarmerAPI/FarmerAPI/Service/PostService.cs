using AutoMapper;
using FarmerAPI.Domain.Contracts;
using FarmerAPI.Domain.Entities;
using FarmerAPI.Infrastructure.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FarmerAPI.Service
{
    public class PostService : IPostService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PostService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PostResponse> CreatePostAsync(PostRequest request)
        {
            var post = _mapper.Map<Post>(request);
            post.PostId = Guid.NewGuid();
            post.CreateDate = DateTime.UtcNow;
            post.UpdateDate = DateTime.UtcNow;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return _mapper.Map<PostResponse>(post);
        }

        public async Task<IEnumerable<PostResponse>> GetAllPostsAsync()
        {
            var posts = await _context.Posts.ToListAsync();

            foreach (var post in posts)
            {
                if (post.ExpireDate < DateTime.UtcNow && post.Status == "Active")
                {
                    post.Status = "Expired";
                    post.UpdateDate = DateTime.UtcNow;
                    _context.Posts.Update(post);
                }
            }

            await _context.SaveChangesAsync();

            var activePosts = posts.Where(p => p.Status == "Active").ToList();

            return _mapper.Map<IEnumerable<PostResponse>>(activePosts);
        }

        public async Task<IEnumerable<PostResponse>> GetAllPostsAnalytic()
        {
            var posts = await _context.Posts.ToListAsync();
            return _mapper.Map<IEnumerable<PostResponse>>(posts);
        }


        public async Task<IEnumerable<PostResponse>> GetAllPostsByUserIdAsync(Guid userId)
        {
            var posts = await _context.Posts
                .Where(p => p.UserId == userId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<PostResponse>>(posts);
        }

        public async Task<PostResponse> UpdatePostAsync(Guid postId, PostRequest request)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) throw new Exception("Post not found");

            post.Title = request.Title;
            post.Price = request.Price;
            post.CropType = request.CropType;
            post.Amount = request.Amount;
            post.Location = request.Location;
            post.Contact = request.Contact;
            post.Description = request.Description;
            post.ExpireDate = request.ExpireDate;
            post.Name = request.Name;
            post.Status = request.Status;
            post.UpdateDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return _mapper.Map<PostResponse>(post);
        }

        public async Task DeletePostAsync(Guid postId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) throw new Exception("Post not found");

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }
    }
}
