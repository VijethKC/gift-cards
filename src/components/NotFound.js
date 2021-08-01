import React from "react";
import { Link } from "react-router-dom";

import "../css/notFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <h1>Page Not Found</h1>
      <Link to="/">
        <button className="btn btn-primary">Home Page</button>
      </Link>
    </div>
  );
};

export default NotFound;
