using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class CreateContactFormMessagesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Users_DealerId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_DealerId",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "DealerId",
                table: "Cars",
                newName: "DealerID");

            migrationBuilder.CreateTable(
                name: "ContactFormMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactFormMessages", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactFormMessages");

            migrationBuilder.RenameColumn(
                name: "DealerID",
                table: "Cars",
                newName: "DealerId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_DealerId",
                table: "Cars",
                column: "DealerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Users_DealerId",
                table: "Cars",
                column: "DealerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
