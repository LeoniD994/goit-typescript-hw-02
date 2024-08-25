import styles from "./ImageCard.module.css";
import { Image } from '../App/App.types';

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <li className={styles.item}>
      <div className={styles.card}>
        <img
          onClick={() => onClick(image)}
          src={image.urls.small}
          alt={image.alt_description}
          className={styles.image}
        />
      </div>
    </li>
  );
};

export default ImageCard;
