using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

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
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sortBy = "")
        {
            var query = _bookContext.Books.AsQueryable();

            // Sort by book name if specified
            if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "name")
            {
                query = query.OrderBy(b => b.Title); // Assuming 'Title' is the book name field
            }

            var paginatedBooks = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var resultObject = new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            };

            return Ok(resultObject);
        }


        [HttpGet("FunctionalBooks")] // Renamed to match books
        public IEnumerable<Books> GetFunctionalBooks()
        {
            var something = _bookContext.Books
                .Where(b => b.Classification == "Functional") // ✅ Adjusted for books
                .ToList();

            return something;
        }
    }
}