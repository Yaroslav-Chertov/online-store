import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, render }) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {render(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  render: PropTypes.func,

};

export default React.memo(List);
