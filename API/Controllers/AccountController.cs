using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if(user == null) return Unauthorized();
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if( await _userManager.Users.AnyAsync(user => user.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is already exist.");
                return ValidationProblem();
                //return BadRequest("Username is already exist.");
            };
            if (await _userManager.Users.AnyAsync(user => user.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is already exist.");
                return ValidationProblem();
            };
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }


        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}
