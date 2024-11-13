import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        onPageChange(newPage);
    };

    return (
        <nav aria-label="Page navigation example" className="mt-4">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button 
                        className="page-link" 
                        aria-label="Previous" 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {totalPages > 0 && [...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button
                            className="page-link" 
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button 
                        className="page-link" 
                        aria-label="Next" 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
