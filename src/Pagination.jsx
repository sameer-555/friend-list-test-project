import "./styles.css";
import { useState } from "react";
const Pagination = ({ friendsPerPage, totalFriends, paginate }) => {
  const pageNumber = [];
  const [currentActivePage, setCurrentActivePage] = useState(1);
  for (let i = 1; i <= Math.ceil(totalFriends / friendsPerPage); i++) {
    pageNumber.push(i);
  }

  const paginationClick = (number) => {
    paginate(number);
    setCurrentActivePage(number);
  };

  return (
    <div className="pagination">
      <div href="#">&laquo;</div>
      {pageNumber.map((number) => (
        <div
          key={number}
          onClick={() => paginationClick(number)}
          className={currentActivePage === number ? "active" : ""}
        >
          {number}
        </div>
      ))}
      <div href="#">&raquo;</div>
    </div>
  );
};

export default Pagination;
