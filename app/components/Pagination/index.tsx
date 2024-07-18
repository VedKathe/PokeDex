import React from 'react';
import styles from "./pagination.module.css"

interface props {
  postsPerPage:any; totalPosts:any; paginate:any;activeIndex:any
}

const Pagination = ({ postsPerPage, totalPosts, paginate ,activeIndex }:props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles['pagination']}>
        {pageNumbers.map((number,index) => (
          <li key={number} onClick={() => paginate(number,index)} className={`${styles['page-item']} ${styles[activeIndex === index ? 'active' : '']}`}>
            <a  className={styles['page-link']}>
              {number}
              
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;