import React from "react";
// import { motion } from "framer-motion/dist/framer-motion";
import CircleLoader from "react-spinners/CircleLoader";
// Image Imports

// User Imports

// css
import "./styles.css";
import SearchBar from "../../components/SearchBar";

const Home = ({
  query,
  setQuery,
  images,
  setImages,
  loader,
  setLoader,
  error,
  setError,
}) => {
  return (
    <div className="home-container">
      <div className="searchbar-home">
        <SearchBar
          query={query}
          setQuery={setQuery}
          images={images}
          setImages={setImages}
          loader={loader}
          setLoader={setLoader}
          error={error}
          setError={setError}
        />
      </div>
      {loader && <CircleLoader color="#bc6c25" size={60} />}
    </div>
  );
};

export default Home;
