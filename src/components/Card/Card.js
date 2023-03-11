import React from 'react';
import './Card.css'
import {Trash} from 'react-bootstrap-icons';
import {PencilSquare} from 'react-bootstrap-icons';

export default function Card({title, onCardDelete, index, editCard}) {
  return (
    <li className="card">
      <h2 className="card__title">{title}</h2>
      <ul className="card__action">
        <li className="card__button">
          <Trash
            color="white"
            size={20}
            onClick={()=> onCardDelete(index)}
          />
        </li>
        <li className="card__button">
          <PencilSquare
            color="white"
            size={20}
            onClick={()=> editCard(index)}/>
        </li>
      </ul>
    </li>
  )
}
