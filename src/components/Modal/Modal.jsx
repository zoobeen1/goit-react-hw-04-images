import { useEffect } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';
import { createPortal } from 'react-dom';
// const modalRoot = document.getElementById('modal-root');
const modalRoot = document.querySelector('#modal-root');

export function Modal({ children, togleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  //Functions
  const handleKeyDown = e => e.code === 'Escape' && togleModal();
  const handleBakcdropClick = e => e.currentTarget === e.target && togleModal();

  return createPortal(
    <StyledOverlay onClick={handleBakcdropClick}>
      <StyledModal>{children}</StyledModal>
    </StyledOverlay>,
    modalRoot
  );
}
