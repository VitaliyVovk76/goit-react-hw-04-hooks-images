import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";
export default function ImageGallery({ images, onOpenModal, onSetImg }) {
  return (
    <div>
      <ul className={s.imageGallery}>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
            onOpenModal={onOpenModal}
            onSetImg={onSetImg}
          />
        ))}
      </ul>
    </div>
  );
}
