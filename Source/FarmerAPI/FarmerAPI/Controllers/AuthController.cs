using FarmerAPI.Domain.Contracts;
using FarmerAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerAPI.Controllers
{

    [Route("api/")]
    public class AuthController : ControllerBase
    {
        private readonly IUserServices _userService;

        public AuthController(IUserServices userService)
        {
            _userService = userService;
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequest request)
        {
            var response = await _userService.RegisterAsync(request);
            return Ok(response);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            var response = await _userService.LoginAsync(request);
            return Ok(response);
        }

        [HttpGet("user/{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(Guid id)
        {
            var response = await _userService.GetByIdAsync(id);
            return Ok(response);
        }


        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await _userService.RefreshTokenAsync(request);
            return Ok(response);
        }


        [HttpPost("revoke-refresh-token")]
        [Authorize]
        public async Task<IActionResult> RevokeRefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await _userService.RevokeRefreshToken(request);
            if (response != null && response.Message == "Refresh token revoked successfully")
            {
                return Ok(response);
            }
            return BadRequest(response);
        }


        [HttpGet("current-user")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var response = await _userService.GetCurrentUserAsync();
            return Ok(response);
        }

        
        [HttpDelete("user/{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _userService.DeleteAsync(id);
            return Ok();
        }

        [HttpGet("GetAllUsers")]
        [Authorize]
        public async Task<IActionResult> GetAllUsers()
        {
            var response = await _userService.GetAllUsersAsync();
            return Ok(response);
        }
    }
}
