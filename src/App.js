import React from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import { useState } from "react";

// User imports

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              query={query}
              setQuery={setQuery}
              images={images}
              setImages={setImages}
              loader={loader}
              setLoader={setLoader}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path={`/search/:id`}
          element={
            <SearchResults
              query={query}
              setQuery={setQuery}
              images={images}
              setImages={setImages}
              loader={loader}
              setLoader={setLoader}
              error={error}
              setError={setError}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
