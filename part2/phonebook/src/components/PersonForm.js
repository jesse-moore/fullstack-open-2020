import React from "react";

export default ({
  handleOnChange,
  handleOnSubmit,
  newName,
  newPhoneNumber,
}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        name:
        <input onChange={handleOnChange} name="name" value={newName} />
      </div>
      <div>
        number:
        <input onChange={handleOnChange} name="number" value={newPhoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
