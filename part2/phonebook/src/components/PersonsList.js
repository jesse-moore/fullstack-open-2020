import React from "react";

export default ({ persons, personsFilter }) => {
  return persons.filter(personsFilter).map((person) => {
    const { name, number } = person;
    return (
      <p key={name}>
        <span>{name}</span> <span>{number}</span>
      </p>
    );
  });
};
