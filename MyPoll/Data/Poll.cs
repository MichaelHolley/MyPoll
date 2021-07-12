using System;
using System.Collections.Generic;

namespace MyPoll.Data
{
	public class Poll : EntityBase
	{
		public Guid Id { get; set; }
		public string Question { get; set; }
		public ICollection<Answer> Answers { get; set; }
		public bool IsPublic { get; set; }
		public bool AllowUserOptions { get; set; }
	}
}
