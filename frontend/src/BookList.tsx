import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(""); // New state for sorting

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}`
        );
        const data = await response.json();
        setBooks(data.books);
        setTotalItem(data.totalNumBooks);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, sortBy]); // Include sortBy in the dependency array

  return (
    <div>
      <h1>Books</h1>
      <br />
      <label>
        Sort by:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="name">Book Name</option>
        </select>
      </label>
      <br />
      {books.map((p) => (
        <div id="bookCard" className="card" key={p.bookId}>
          <h2 className="card-title">{p.title}</h2>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {p.author}
              </li>
              <li>
                <strong>Publisher:</strong> {p.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {p.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {p.classification}
              </li>
              <li>
                <strong>Category:</strong> {p.category}
              </li>
              <li>
                <strong>Page Count:</strong> {p.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {p.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <div>
        <button
          className="btn btn-primary me-2" // Bootstrap styling for "Previous" button
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${
              pageNum === index + 1 ? "btn-secondary" : "btn-outline-primary"
            } mx-1`} // Highlight current page and style others
            onClick={() => setPageNum(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-primary ms-2" // Bootstrap styling for "Next" button
          disabled={pageNum === totalPages || books.length < pageSize}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            const newSize = Number(p.target.value);
            setPageSize(newSize);
            setPageNum(1); // Reset to first page when changing page size
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
    </div>
  );
}

export default BookList;
