import React from 'react';

function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="pagination-container">
            <ul className="pagination-list">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "pagination-button active" : "pagination-button"}
                    >
                        {i + 1}
                    </button>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;
