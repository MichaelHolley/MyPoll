using Microsoft.EntityFrameworkCore.Migrations;

namespace MyPoll.Migrations
{
    public partial class AllowMultiSelection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AllowMultiSelection",
                table: "Polls",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowMultiSelection",
                table: "Polls");
        }
    }
}
