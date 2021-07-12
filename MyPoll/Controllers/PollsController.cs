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
		public IActionResult PostPoll([FromBody] Poll poll)
		{
			_context.Polls.Add(poll);
			_context.SaveChanges();

			return Ok(poll.RemoveCycle());
		}

		[HttpPost("[action]")]
		public IActionResult AddAnswer(Guid pollId, [FromBody] Answer answer)
		{
			// TODO: implement
			return Ok();
		}

		[HttpPut("[action]")]
		public IActionResult Vote(Guid pollId, Guid answerId)
		{
			// TODO: implement
			return Ok();
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
