import { useEffect, useState } from "react";
import { Book } from "../types/Book";
// import { useNavigate } from "react-router-dom";
import { BookItem } from "../types/BookItem";
import { useCart } from "../context/CartContext";
import { fetchBooks } from "../api/ProjectsAPI";
import Pagination from "./Pagination"; // Ensure this import exists if using Pagination

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  // const navigate = useNavigate();
  const { addToCart } = useCart();

  // Error handling
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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
                <span className="badge bg-info">{p.category}</span>
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
              onClick={() => handleAddToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1); // Reset page number when changing page size
        }}
      />
    </div>
  );
}

export default BookList;
