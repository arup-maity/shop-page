import React, { useState } from "react";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";

interface PaginationProps {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, perPage, currentPage, onChange }) => {
  const totalPages: number = Math.ceil(totalItems / perPage);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const visiblePageRange: number = 1; // Number of visible page numbers excluding ellipsis

  const generatePageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= visiblePageRange * 2 + 1) {
      // Display all pages if total pages are less than or equal to visiblePageRange
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Display a subset of pages with ellipsis

      // Helper function to add dots
      const addEllipsis = (): void => {
        pageNumbers.push("...");
      };

      let startPage: number = Math.max(1, currentPage - visiblePageRange);
      let endPage: number = Math.min(totalPages, startPage + visiblePageRange * 2);

      if (currentPage < visiblePageRange + 1) {
        endPage = visiblePageRange * 2 + 1;
      } else if (currentPage > totalPages - visiblePageRange) {
        startPage = totalPages - visiblePageRange * 2;
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          addEllipsis();
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          addEllipsis();
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number): void => {
    // setCurrentPage(page);
    onChange(page);
  };
  if (totalPages === 0) {
    return null;
  }
  return (
    <div className="shop-page-pagination d-flex flex-nowrap align-items-center gap-3">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`pagination-nav-btn ${currentPage === 1 ? "disabled" : ""} d-flex justify-content-center align-items-center rounded`}>
        <HiOutlineChevronLeft size={30} />
      </button>

      <ul className="d-flex flex-nowrap align-items-center list-unstyled gap-1 m-0">
        {generatePageNumbers().map((page, index) => (
          <li
            role="button"
            key={index}
            onClick={() => handlePageChange(page as number)}
            className={`pagination-page-item ${currentPage === page ? "active" : ""} ${page === "..." ? "no-border" : ""} d-flex align-items-center justify-content-center rounded`}>
            {page}
          </li>
        ))}
      </ul>

      <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="pagination-nav-btn d-flex justify-content-center align-items-center rounded-2">
        <HiOutlineChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
