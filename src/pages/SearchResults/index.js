import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";

import SearchBar from "../../components/SearchBar";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";

import "./styles.css";

const SearchResults = ({
  query,
  setQuery,
  images,
  setImages,
  loader,
  setLoader,
  error,
  setError,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [next, setNext] = useState(true);
  const [prev, setPrev] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const navigate = useNavigate();

  //Fetch Images
  const fetchImages = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query, per_page: 30, page: pageNumber },
          headers: {
            Authorization: `Client-ID 4Brf-N8uMkut9U01GTGPriMQkIEbFd2JpwS_dK4a2j4`,
          },
        }
      );
      setError("");
      if (data.results.length === 0) {
        setError("No images found :(");
      }

      const transformed = data.results.map(({ urls, width, height }) => ({
        src: urls.regular,
        width,
        height,
      }));
      setImages(transformed);

      if (pageNumber === data.total_pages) {
        setNext(false);
      }

      if (pageNumber > 1) {
        setPrev(true);
      } else {
        setPrev(false);
      }

      setLoader(false);
      navigate(`/search/${query}`);
    } catch (error) {
      setError("Something went wrong :(");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [pageNumber]);

  const loadNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const loadPrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
      <div className="top-container">
        <div className="main-container">
          <div className="searchbar-searchresults">
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
        </div>

        {loader ? (
          <div className="loader">
            <CircleLoader color="#bc6c25" size={60} />
          </div>
        ) : (
          <motion.div
            style={{ marginTop: "2rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Gallery photos={images} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={images.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </motion.div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
      <div className="pagination-container">
        {prev && !loader && (
          <button className="btn-pagination" onClick={loadPrevPage}>
            <ArrowLeftIcon width={25} />
          </button>
        )}
        {next && !loader && (
          <button className="btn-pagination" onClick={loadNextPage}>
            <ArrowRightIcon width={25} />
          </button>
        )}
      </div>
    </>
  );
};

export default SearchResults;
