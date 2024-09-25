import React from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ totalCount, limit, activePage, setActivePage }) {
  const cn = bem('Pagination')

  const totalPages = Math.ceil(totalCount / limit)
  const pageNumbers = []

  let startPage = Math.max(1, activePage - 1); //2
  let endPage = Math.min(totalPages, activePage + 2); //4

  if (activePage > 2) endPage = Math.min(totalPages, activePage + 1)
  if (activePage + 1 >= totalPages) {
    startPage = Math.max(1, activePage - 2);
    endPage = Math.min(totalPages, activePage + 2);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (startPage > 2) {
    pageNumbers.unshift('...');
    pageNumbers.unshift(1);
  }
  if (startPage === 2) {
    pageNumbers.unshift(1);
  }

  if (activePage + 2 < totalPages) {
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }
  if (activePage + 2 === totalPages) pageNumbers.push(totalPages)

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {pageNumbers.map((page, index) => (
          <li key={index}
            onClick={() => setActivePage(page)}
            className={cn('item', { active: page === activePage, dots: page === '...' })}
          >
            {page}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Pagination
