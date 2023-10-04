import { GlobalStyle } from 'GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageLoader } from 'components/ImageLoader';
import { Modal } from './Modal';

export function App() {
  //States
  const [query, setQuery] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imgName, setImgName] = useState('');
  const [showModal, setShowModal] = useState(false);

  //Functions
  //Тоглим модалку
  const togleModal = () => setShowModal(pshowModal => !pshowModal);

  //Вызов модалки
  const onModal = (url, name) => {
    setImgUrl(url);
    setImgName(name);
    togleModal();
  };
  //Нажали кнопку поиска - обработчик
  const handleFormSubmit = searchQuery => setQuery(searchQuery);

  // *************************************************************************

  return (
    <>
      <GlobalStyle />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageLoader onModal={onModal} query={query} />
      <ToastContainer autoClose={1000} />
      {showModal && (
        <Modal togleModal={togleModal}>
          <img src={imgUrl} alt={imgName} />
        </Modal>
      )}
    </>
  );
}
