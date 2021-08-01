import React from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function BasicPagination({ totalPages, onClickPageChange }) {
  const handleClick = (n) => {
    return onClickPageChange(n);
  };

  return (
    <div>
      <Pagination
        count={totalPages}
        defaultPage={1}
        onChange={(e, n) => handleClick(n)}
        color="secondary"
      />
    </div>
  );
}
