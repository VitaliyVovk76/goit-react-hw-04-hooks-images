import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import imageApiService from "./servises/image-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryError from "./components/ImageGalleryError/ImageGalleryError";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import s from "./App.module.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [imgModal, setImgModal] = useState(null);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    fetchImages(searchQuery, page);
  }, [searchQuery, page]);

  function fetchImages(query, page) {
    setStatus(Status.PENDING);
    imageApiService(query, page)
      .then((images) => {
        if (images.total === 0) {
          setError({ message: `There are no pictures with the name ${query}` });
          setStatus(Status.REJECTED);
          return;
        }

        setImages((prevImages) => [...prevImages, ...images.hits]);
        setStatus(Status.RESOLVED);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        setError({ message: `There are no pictures with the name ${query}` });
        setStatus(Status.REJECTED);
      });
  }

  const setModalImage = (img, alt) => {
    setImgModal({ img: img, alt: alt });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const pageIncrement = () => setPage((prevPage) => prevPage + 1);

  const hendleFormSubmit = (search) => {
    setSearchQuery(search);
    setPage(1);
    setImages([]);
  };

  return (
    <div>
      <SearchBar onSubmit={hendleFormSubmit} />
      {status === Status.PENDING && (
        <>
          <ImageGallery
            images={images}
            onOpenModal={toggleModal}
            onSetImg={setModalImage}
          />
          <div className={s.loader}>
            <Loader />
            <p>Загружаем...</p>
          </div>
        </>
      )}
      {status === Status.RESOLVED && (
        <>
          <ImageGallery
            images={images}
            onOpenModal={toggleModal}
            onSetImg={setModalImage}
          />
          <Button onNextPageImg={pageIncrement} />

          {showModal && (
            <Modal onCloseModal={toggleModal} imgModal={imgModal} />
          )}
        </>
      )}
      {status === Status.REJECTED && (
        <ImageGalleryError message={error.message} />
      )}
    </div>
  );
}
export default App;
