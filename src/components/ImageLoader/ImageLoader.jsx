import { useEffect, useState } from 'react';
import { ImageGallery } from 'components/ImageGallery';
import API from 'services/api';
import { toast } from 'react-toastify';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader/Loader';

export function ImageLoader({ query, onModal }) {
  //States
  const [hitCounter, setHitCounter] = useState(0);
  const [imgs, setImgs] = useState(null);
  const [status, setStatus] = useState('idle');

  //State machine:
  //idle - простой,
  //pending - добавляется,
  //resolved - успешно,
  //rejected - отклонено

  useEffect(() => {
    query && onLoad(query);
  }, [query]);

  async function onLoad(query) {
    setStatus('pending');
    API.params.q = query;
    API.params.page = 1;

    const resp = await API.getPhotos();
    try {
      if (resp.total === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setStatus('rejected');
        return;
      }
      toast.success(`Hooray! We found ${resp.totalHits} images.`);
      setImgs(resp.hits);
      setHitCounter(resp.totalHits - API.params.per_page);
      setStatus('resolved'); //Важно чтобы было в конце - реакт перерендеривает асинхронный код на каждом шаге
    } catch (err) {
      console.log(
        'Error in catch: ',
        err.message,
        ' response: ',
        err.response.data
      );
    }
  }

  async function onLoadMore() {
    API.params.page++;

    const resp = await API.getPhotos();
    try {
      if (hitCounter < API.params.per_page) {
        toast.info(
          "We're sorry, but you've reached the end of search results."
        );

        return;
      }
      setImgs(prevState => [...prevState, ...resp.hits]);
      setHitCounter(p => p - API.params.per_page);
    } catch (err) {
      console.log(
        'Error in catch: ',
        err.message,
        ' response: ',
        err.response.data
      );
    }
  }

  // if (status === 'idle') return <div>Введите запрос</div>;
  if (status === 'pending') return <Loader />;
  if (status === 'rejected') return <div>Ошибка!</div>;
  if (status === 'resolved')
    return (
      <>
        <ImageGallery onModal={onModal} imgs={imgs} />
        <Button onClick={onLoadMore} />
      </>
    );
}
