using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace MyPoll.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }

		public DbSet<Poll> Polls { get; set; }
		public DbSet<Answer> Answers { get; set; }

		public override int SaveChanges()
		{
			var entries = ChangeTracker.Entries().Where(e =>
				e.Entity is EntityBase && (
				e.State == EntityState.Added
				|| e.State == EntityState.Modified));

			foreach (var entityEntry in entries)
			{
				if (entityEntry.State == EntityState.Added)
				{
					((EntityBase)entityEntry.Entity).Created = DateTime.Now;
				}
			}

			return base.SaveChanges();
		}
	}
}
