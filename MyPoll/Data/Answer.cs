using System;
using System.ComponentModel.DataAnnotations;

namespace MyPoll.Data
{
	public class Answer : EntityBase
	{
		[Key]
		public Guid Id { get; set; }
		public string Content { get; set; }
		public int Votes { get; set; }
		public Poll Poll { get; set; }
	}
}
