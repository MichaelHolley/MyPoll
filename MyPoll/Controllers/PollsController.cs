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
			return Ok(_context.Polls.Include(p => p.Answers).Where(p => p.IsPublic).RemoveCycle());
		}

		[HttpGet("[action]")]
		public IActionResult GetPoll(Guid id)
		{
			var poll = _context.Polls.Include(p => p.Answers).SingleOrDefault(p => p.Id.Equals(id));

			if (poll == null)
			{
				return NotFound();
			}

			return Ok(poll.RemoveCycle());
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
		public IActionResult Vote([FromQuery] Guid pollId, [FromBody] ICollection<Guid> answerIds)
		{
			var poll = _context.Polls.SingleOrDefault(p => p.Id.Equals(pollId));

			if (poll == null)
			{
				return BadRequest();
			}

			foreach (var aId in answerIds)
			{
				var answer = _context.Answers.SingleOrDefault(a => a.Id.Equals(aId));

				if (answer != null)
				{
					answer.Votes = answer.Votes + 1;
					_context.SaveChanges();
				}
			}

			return Ok(poll.RemoveCycle());
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
