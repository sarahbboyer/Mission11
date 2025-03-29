import { useState } from "react";
import CategoryFile from "../components/CategoryFile";
import BookList from "../components/BookList";
import WelcomeBand from "../components/WelcomeBand";
import CartSummary from "../components/CartSummary";

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <div className="container">
      <CartSummary />
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          {/* This is for the bootstrap grid */}
          <CategoryFile
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          {/* Pass selectedCategories as an object */}
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
