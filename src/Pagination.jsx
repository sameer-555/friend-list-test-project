import "./styles.css";
import { useState, useEffect } from "react";

const Pagination = ({
  friendsPerPage,
  totalFriends,
  paginate,
  currentData
}) => {
  const pageNumber = [];
  const [currentActivePage, setCurrentActivePage] = useState(1);
  for (let i = 1; i <= Math.ceil(totalFriends / friendsPerPage); i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    if (currentData === 0 && currentActivePage > 1) {
      let pageNumber = currentActivePage - 1;
      paginate(pageNumber);
      setCurrentActivePage(pageNumber);
    }
  }, [currentActivePage, paginate, currentData]);

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
