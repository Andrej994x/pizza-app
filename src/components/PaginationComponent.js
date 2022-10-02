import React from "react";

const PaginationComponent = ({ pageNumber, setPage }) => {
  return (
    <div className="flex justify-center mb-4">
      <a
        href="#"
        onClick={() => {
          setPage(pageNumber != 1 ? pageNumber - 1 : null);
        }}
        className="flex items-center border-solid border-2 border-cyan-600 hover:bg-cyan-700 px-4 py-2 mx-1 text-black bg-wheat  transition-colors duration-300 transform  rounded-md "
      >
        Previous
      </a>

      <div
        className="items-center hidden px-4 py-2 mx-1 text-black transition-colors duration-300 transform bg-wheat rounded-md sm:flex border-solid border-2 border-cyan-600 "
      >
        {pageNumber}
      </div>

      <a
        href="#"
        onClick={() => {
          setPage(pageNumber + 1);
        }}
        className="flex items-center border-solid border-2 border-cyan-600 hover:bg-cyan-700 px-4 py-2 mx-1 text-black bg-wheat  transition-colors duration-300 transform  rounded-md "
      >
        Next
      </a>
    </div>
  );
};

export default PaginationComponent;
