using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command: IRequest<Result<CommentDto>>
        {
            public Guid ActivityId { get; set; }
            public string Body { get; set; }
        }

        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Comments)
                    .ThenInclude(c => c.Author)
                    .ThenInclude(u => u.Photos)
                    .FirstOrDefaultAsync(a => a.Id == request.ActivityId);

                if (activity == null) return null;

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Body = request.Body,
                    Activity = activity,
                    Author = user
                };
                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                return success ? Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment)) : Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}
