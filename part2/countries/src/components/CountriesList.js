import React from "react";

export default ({ data }) => {
  return (
    <div>
      {data.map(({ name }) => {
        return <p key={name}>{name}</p>;
      })}
    </div>
  );
};
