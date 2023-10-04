import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarStyled,
  FormStyled,
  InputStyled,
  ButtonStyled,
  ButtonLabelStyled,
} from './Searchbar.styled';

//Готово! Работает
//Возвращает в стэйт аппа поисковый запрос после нажатия на кнопку поиска
export function Searchbar({ onSubmit }) {
  //State
  const [searchQuery, setSearchQuery] = useState('');

  // Вызывается при отправке формы
  // очищает поле ввода
  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Введите запрос прежде чем отправлять!!!');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };
  // Вызывается при изменении поля ввода
  // изменяет "местный" стэйт - паттерн "Контролируемый элемент"
  const handleChange = e => setSearchQuery(e.currentTarget.value.toLowerCase());

  // *************************************************************************
  return (
    <SearchbarStyled>
      <FormStyled onSubmit={handleSubmit}>
        <ButtonStyled type="submit">
          <ButtonLabelStyled>Search</ButtonLabelStyled>
        </ButtonStyled>
        <InputStyled
          type="text"
          name="search"
          autocomplete="off"
          value={searchQuery}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </FormStyled>
    </SearchbarStyled>
  );
}
