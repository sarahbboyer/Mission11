using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;
using System.Linq;
using System.Collections.Generic;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public OkObjectResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sortBy = "", [FromQuery] List<string>? categories = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (categories  != null && categories.Any())
            {
                // Split the comma-separated categories string into a list
                //var categoryList = categories.Split(',').ToList();

                //Console.WriteLine("Filtering by categories:", string.Join(", ", categoryList));

                // Filter books by categories (checking if any category matches)
                query = query.Where(b => categories.Contains(b.Category));
            }

            // Sorting logic
            if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "name")
            {
                query = query.OrderBy(b => b.Title);
            }

            var totalNumBooks = query.Count();

            var paginatedBooks = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var resultObject = new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            };

            return Ok(resultObject);
        }


        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var categories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(categories);
        }
    }
}