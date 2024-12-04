import React from 'react';

const ConfirmDeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Confirm
    </button>
  );
};

export default ConfirmDeleteButton;
