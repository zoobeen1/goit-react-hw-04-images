import { Component } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';
import { createPortal } from 'react-dom';
// const modalRoot = document.getElementById('modal-root');
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.togleModal();
    }
  };
  handleBakcdropClick = e => {
    e.currentTarget === e.target && this.props.togleModal();
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <StyledOverlay onClick={this.handleBakcdropClick}>
        <StyledModal>{children}</StyledModal>
      </StyledOverlay>,
      modalRoot
    );
  }
}
