import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate, useParams } from "react-router-dom";
import { BookItem } from "../types/BookItem";
import { useCart } from "../context/CartContext";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");
      try {
        const response = await fetch(
          `http://localhost:4000/api/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${
            categoryParams ? `&${categoryParams}` : ""
          }`
        );
        const data = await response.json();
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  const handleAddToCart = (book: Book) => {
    const newItem: BookItem = {
      bookID: Number(book.bookID),
      title: book.title || "Unknown Project",
      author: book.author,
      price: book.price,
      quantity: 1,
    };
    addToCart(newItem);
  };

  return (
    <div>
      <h1>Books</h1>
      <br />
      <br />
      {books.map((p) => (
        <div id="bookCard" className="card" key={p.bookID}>
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
                <strong>Category:</strong>{" "}
                <span className="badge bg-info"></span>
                {p.category}
              </li>
              <li>
                <strong>Page Count:</strong> {p.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {p.price}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() => {
                // Call the function to add the item to the cart

                handleAddToCart(p); // Navigate to the cart page
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div>
        <button
          className="btn btn-primary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${pageNum === index + 1 ? "btn-secondary" : "btn-outline-primary"} mx-1`}
            onClick={() => setPageNum(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-primary ms-2"
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
            setPageNum(1);
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
