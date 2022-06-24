import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import { SearchIcon } from "@heroicons/react/outline";

import "./styles.css";

const SearchBar = ({
  query,
  setQuery,
  images,
  setImages,
  loader,
  setLoader,
  error,
  setError,
}) => {
  const navigate = useNavigate();
  const fetchImages = async (page) => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query, per_page: 30, page },
          headers: {
            Authorization: `Client-ID 4Brf-N8uMkut9U01GTGPriMQkIEbFd2JpwS_dK4a2j4`,
          },
        }
      );
      setError("");
      if (data.total_pages === 0) {
        setError("No images found :(");
      }

      const transformed = data.results.map(({ urls, width, height }) => ({
        src: urls.small,
        width,
        height,
      }));
      setImages(transformed);
      setLoader(false);
      navigate(`/search/${query}`);
    } catch (error) {
      setError("Something went wrong :(");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages(1);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-circle">&nbsp;</div>
      <motion.div
        className="title-div"
        onClick={() => navigate("/")}
        initial={{ opacity: 0, y: -1300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ stiffness: 20, type: "spring" }}
      >
        <h1 className="home_title">
          Imageistic
          <motion.span
            className="home_title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            .
          </motion.span>
        </h1>
      </motion.div>
      <div className="search-flex">
        <form onSubmit={handleSubmit}>
          <motion.input
            className="search_input"
            placeholder="Search..."
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ stiffness: 30, type: "spring" }}
            value={query}
            whileHover={{ scale: 1.04 }}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <motion.div
          className="background_circle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ backgroundColor: "#fff", duration: 1 }}
        >
          <SearchIcon className="search_icon" onClick={handleSubmit} />
        </motion.div>
      </div>
    </div>
  );
};

export default SearchBar;
