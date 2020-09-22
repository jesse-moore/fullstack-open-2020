import React from "react";

export default ({ handleOnChange, newFilter }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleOnChange} name="filter" value={newFilter} />
    </div>
  );
};
