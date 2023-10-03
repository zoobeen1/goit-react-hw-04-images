import { ListStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imgs, onModal }) => {
  return (
    <ListStyled>
      {imgs.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          imgUrl={webformatURL}
          url={largeImageURL}
          imgName={tags}
          onModal={onModal}
        />
      ))}
    </ListStyled>
  );
};
