using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPoll.Data;

namespace MyPoll.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PollsController : ControllerBase
	{
		private readonly DataContext _context;

		public PollsController(DataContext context)
		{
			_context = context;
		}

		[HttpGet("[action]")]
		public IActionResult GetPublicPolls()
		{
			return Ok(_context.Polls.Where(p => p.IsPublic).ToList());
		}

		[HttpGet("[action]")]
		public IActionResult GetPoll(Guid id)
		{
			var poll = _context.Polls.Find(id);

			if (poll == null)
			{
				return NotFound();
			}

			return Ok(poll);
		}

		[HttpPost("[action]")]
		public IActionResult PostPoll(Poll poll)
		{
			_context.Polls.Add(poll);
			_context.SaveChanges();

			return CreatedAtAction("GetPoll", new { id = poll.Id }, poll);
		}

		[HttpDelete("[action]")]
		public IActionResult DeletePoll(Guid id)
		{
			var poll = _context.Polls.Find(id);
			if (poll == null)
			{
				return NotFound();
			}

			_context.Polls.Remove(poll);
			_context.SaveChanges();

			return Ok();
		}
	}
}
