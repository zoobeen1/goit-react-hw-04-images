// import { GlobalStyle } from 'GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from 'GlobalStyle';
import { ToastContainer } from 'react-toastify';
import React, { Component } from 'react';
//import axios from 'axios';
import { Searchbar } from 'components/Searchbar';
import { ImageLoader } from 'components/ImageLoader';
import { Modal } from './Modal';
// import { ImageGallery } from 'components/ImageGallery';
// import { Button } from 'components/Button';

export class App extends Component {
  state = {
    query: '',
    imgUrl: '',
    imgName: '',
    showModal: false,
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onModal = (url, name) => {
    this.setState({
      imgUrl: url,
      imgName: name,
    });
    this.togleModal();
  };

  handleFormSubmit = searchQuery => {
    this.setState({ query: searchQuery });
  };
  // *************************************************************************
  render() {
    const { imgUrl, imgName, showModal } = this.state;
    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageLoader onModal={this.onModal} query={this.state.query} />

        <ToastContainer autoClose={1000} />
        {showModal && (
          <Modal togleModal={this.togleModal}>
            <img src={imgUrl} alt={imgName} />
          </Modal>
        )}
      </>
    );
  }
}
