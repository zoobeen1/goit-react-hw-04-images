import { Container } from './Loader.styled';
import { Dna } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <Container>
      <Dna visible={true} height="400" width="400" ariaLabel="dna-loading" />
    </Container>
  );
};
