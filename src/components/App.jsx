// import { GlobalStyle } from 'GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from 'GlobalStyle';
import { ToastContainer } from 'react-toastify';
import React, { useState } from 'react';
//import axios from 'axios';
import { Searchbar } from 'components/Searchbar';
import { ImageLoader } from 'components/ImageLoader';
import { Modal } from './Modal';

export function App() {
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
