using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPoll.Data
{
	public static class RemoveCycleExtension
	{
		public static ICollection<Poll> RemoveCycle(this IQueryable<Poll> polls)
		{
			var result = polls.Select(p => p.RemoveCycle()).ToList();

			return result;
		}

		public static Poll RemoveCycle(this Poll poll)
		{
			poll.Answers = poll.Answers.Select(a =>
			{
				return new Answer()
				{
					Id = a.Id,
					Poll = null,
					Content = a.Content,
					Votes = a.Votes,
					Created = a.Created
				};
			}).ToList();

			return poll;
		}
	}
}
