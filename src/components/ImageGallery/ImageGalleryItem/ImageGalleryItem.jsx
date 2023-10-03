import { ListItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imgUrl, imgName, url, onModal }) => {
  return (
    <ListItem>
      <Image src={imgUrl} alt={imgName} onClick={() => onModal(url, imgName)} />
    </ListItem>
  );
};
