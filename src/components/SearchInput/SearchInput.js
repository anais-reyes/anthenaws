import React from 'react';
import './SearchInput.css';

function SearchInput(props) {
  return (
    <section className="SearchInput">
      <p>Type the name of any user</p>
      <input
        type="text"
        onChange={event => {
          props.findUsers(event);
        }}
      />
    </section>
  );
}

export default SearchInput;
