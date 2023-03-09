import {CardList} from 'react-bootstrap-icons';
import {PersonCircle} from 'react-bootstrap-icons';

import './Header.css'

function Header() {
  return (
    <header className="header">
      <CardList
        color="white"
        size={30}
      />
      <nav className="header__navigation">
        <button className="header__button header__button_type_addUser">Найти пользователя</button>
        <button className="header__button header__button_type_addTask">Добавить доброе дело</button>
        <button className="header__button header__button_type_addTask">Друзья</button>
      </nav>
      <div className="header__user">
        <p className="header__userName">Nicky</p>
        <PersonCircle
          color="white"
          size={30}/>
      </div>
    </header>
  )
}

export default Header
