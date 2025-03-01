using AutoMapper;
using FarmerAPI.Domain.Contracts;
using FarmerAPI.Domain.Entities;
using Microsoft.Extensions.Hosting;

namespace FarmerAPI.Infrastructure.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserResponse>();
            CreateMap<User, CurrentUserResponse>();
            CreateMap<UserRegisterRequest, User>();
            CreateMap<Post, PostResponse>();
            CreateMap<PostRequest, Post>();
        }
    }
}
