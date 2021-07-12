using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPoll.Data
{
	public static class RemoveCycleExtension
	{
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
