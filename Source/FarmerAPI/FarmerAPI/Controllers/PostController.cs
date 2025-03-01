using FarmerAPI.Domain.Contracts;
using FarmerAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerAPI.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] PostRequest request)
        {
            var response = await _postService.CreatePostAsync(request);
            return Ok(response);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPosts()
        {
            var response = await _postService.GetAllPostsAsync();
            return Ok(response);
        }

        [HttpGet("analytic")]
        [Authorize]
        public async Task<IActionResult> GetAllPostsAnalytic()
        {
            var response = await _postService.GetAllPostsAnalytic();
            return Ok(response);
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetAllPostsByUserId(Guid userId)
        {
            var response = await _postService.GetAllPostsByUserIdAsync(userId);
            return Ok(response);
        }

        [HttpPut("{postId}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(Guid postId, [FromBody] PostRequest request)
        {
            var response = await _postService.UpdatePostAsync(postId, request);
            return Ok(response);
        }

        [HttpDelete("{postId}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(Guid postId)
        {
            await _postService.DeletePostAsync(postId);
            return NoContent();
        }
    }
}
