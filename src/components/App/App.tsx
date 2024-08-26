import { useState, useEffect } from "react";
import { Image } from "./App.types";
import { ApiResponse } from "./App.types";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "../ImageModal/ImageModal";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const ACCESS_KEY = "-sJCLq8E-9EKutcywgbvCSzdprDJNev8CkeRnE8FKmQ";

  const fetchImages = async (query: string, page: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${ACCESS_KEY}`
      );
      ` `;
      const data: ApiResponse = await response.json();
      if (page === 1) {
        setImages(data.results);
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
      <Toaster />
    </div>
  );
};

export default App;
