import { useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

interface Image {
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
}

ReactModal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
    >
      <div onClick={handleOverlayClick} className={styles.content}>
        {image && (
          <>
            <img src={image.urls.regular} alt={image.alt_description} />
            <button onClick={onClose} className={styles.closeButton}>
              &times;
            </button>
          </>
        )}
      </div>
    </ReactModal>
  );
};

export default ImageModal;
