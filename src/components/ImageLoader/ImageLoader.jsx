import { Component } from 'react';
// import PropTypes from 'prop-types';
import { ImageGallery } from 'components/ImageGallery';
import API from 'services/api';
import { toast } from 'react-toastify';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageLoader extends Component {
  state = {
    imgs: null,
    error: null,
    status: 'idle',
    hitCounter: 0,
    //State machine:
    //idle - простой,
    //pending - добавляется,
    //resolved - успешно,
    //rejected - отклонено
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.setState({
        status: 'pending',
        imgs: null,
        error: null,
      });
      this.onLoad(this.props.query);
    }
  }

  onError() {
    this.setState({
      error: API.params.error,
      status: 'rejected',
    });
    toast.error('Oops, something went wrong. Please try again.');
  }

  onLoad = query => {
    API.params.q = query;
    API.params.page = 1;

    API.getPhotos().then(resp => {
      if (resp.total === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        return false;
      }
      // toast.success(`Hooray! We found ${resp.total} images.`);
      this.setState({
        status: 'resolved',
        imgs: resp.hits,
        hitCounter: API.params.per_page,
      });
      return true;
    });
  };

  onLoadMore = () => {
    const { hitCounter } = this.state;
    API.params.page++;
    API.getPhotos()
      .then(resp => {
        if (resp.totalHits <= hitCounter) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        }
        this.setState(prevState => {
          console.log('Работает setState');
          return {
            status: 'resolved',
            imgs: [...prevState.imgs, ...resp.hits],
          };
        });
        this.setState({
          hitCounter: this.state.hitCounter + API.params.per_page,
        });
        // lightbox.refresh();
      })
      .catch(console.log('Error in catch'));
  };

  render() {
    const { imgs, status } = this.state;

    // if (status === 'idle') return <div>Введите запрос</div>;
    if (status === 'pending') return <Loader />;
    if (status === 'rejected') return <div>Ошибка!</div>;
    if (status === 'resolved')
      return (
        <>
          <ImageGallery onModal={this.props.onModal} imgs={imgs} />
          <Button onClick={this.onLoadMore} />
        </>
      );
  }
}

// Contacts.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };
