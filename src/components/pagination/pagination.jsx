import React from 'react';
import {useNavigate} from "react-router-dom";

const Pagination = ({ totalPages, setPage, page }) => {
  const navigate = useNavigate();
  return (
      <div className="pagination m-6 flex justify-center">
        {Array.from({ length: totalPages }).map((_, index) => (
            <button
                key={index}
                className={`mx-1 px-3 py-1 border rounded hover:bg-gray-100 focus:outline-none 
                        ${index !== page ? 'bg-gray-200 font-bold' : ''}`}
                onClick={() => {
                  setPage(index);
                  navigate(`/?page=${index}`);
                }}
            >
              {index + 1}
            </button>
        ))}
      </div>
  );
};

export default Pagination;
