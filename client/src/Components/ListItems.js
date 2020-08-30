import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';

function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className='list' key={item.key}>
        <p>
          <input
            disabled
            type='text'
            id={item.key}
            value={item.text}
            onChange={() => {}}
          />
          <span>
            <FontAwesomeIcon
              className='faicons'
              onClick={() => {
                props.showUpdate(item.key, item.text);
              }}
              icon='pen'
            />
            <FontAwesomeIcon
              className='faicons'
              onClick={() => {
                props.deleteItem(item.key, item.text);
              }}
              icon='trash'
            />
          </span>
        </p>
      </div>
    );
  });
  return (
    <div>
      <FlipMove duration={300} easing='ease-in-out'>
        {listItems}
      </FlipMove>
    </div>
  );
}

export default ListItems;
