import React from 'react';
import './Card.css'
import {Trash} from 'react-bootstrap-icons';
import {Eye} from 'react-bootstrap-icons';
import {PencilSquare} from 'react-bootstrap-icons';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'


function Card(props) {
  // const card = props.data
  // const data ={
  //   image: props.data.link,
  //   description: props.data.name,
  // }
  //
  // const currentUser = React.useContext(CurrentUserContext)
  // const isOwn = card?.owner._id === currentUser._id;
  // const cardDeleteButtonClassName = (
  //   `gallery__delete ${isOwn ? '' : 'none'}`
  // );
  //
  // const isLiked = card?.likes.some(i => i._id === currentUser._id);
  // const likeClassName = (
  //   `gallery__like ${isLiked ? 'gallery__like_active' : ''}`
  // );
  function handleTest() {
    console.log('abra')
  }

  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__title ellipsis">Good buisness</h2>
        <p className="card__description ellipsis">appropriate text alternative. Depending on which method you’re using to add the icons, and where you’re using them (e.g. as standalone images, or as the only content of a button or similar control), there are various possible approaches. Here are a few examples:</p>
      </div>
      <ul className="card__action">
        <li className="card__button">
          <Trash
            color="white"
            size={20}
            onClick={handleTest}
          />
        </li>
        <li className="card__button">
          <Eye
            color="white"
            size={20}/>
        </li>
        <li className="card__button">
          <PencilSquare
            color="white"
            size={20}/>
        </li>
      </ul>

    </li>
  )
}

export default Card
