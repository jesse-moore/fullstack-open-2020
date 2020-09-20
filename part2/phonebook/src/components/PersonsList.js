import React from "react";

export default ({ persons, personsFilter, handleDelete }) => {
  return persons.filter(personsFilter).map((person) => {
    const { name, number, id } = person;
    return (
      <p key={name}>
        <span>{name}</span> <span>{number} </span>
        <button name={id} onClick={handleDelete}>
          delete
        </button>
      </p>
    );
  });
};
