import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/homePage.css";
import Card from "./Card";
import Paginate from "./Paginate";
import CardModal from "./CardModal";

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [newData, setNewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(4);
  const [dbError, setDbError] = useState("");

  const indexOfLastPage = currentPage * cardsPerPage;
  const indexOfFirstPage = indexOfLastPage - cardsPerPage;
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const currentCards = cards.slice(indexOfFirstPage, indexOfLastPage);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get("http://localhost:3004/giftCards");
        setCards(res.data.reverse());
      } catch (e) {
        setDbError("Please connect to DataBase by referring README.md file");
      }
    };
    fetchCards();
  }, [newData]);

  const onClickPageChange = (number) => {
    setCurrentPage(number);
  };

  const postData = (res) => {
    setNewData(res);
  };

  return (
    <div>
      <div className="titleCard">
        <p>GIFT CARDS</p>
      </div>
      <div className="screenContent">
        <h1>A GIFT OF CHOICE</h1>
        <p>Celebrate every occasion with your loved ones in a special way.</p>
        <CardModal
          postData={postData}
          title="Create New Card"
          className="btn btn-primary createButton"
        />
      </div>

      <div className="cardContent">
        <p>{dbError}</p>
        {currentCards?.map((card) => {
          return (
            <div key={card.id}>
              <Card card={card} postData={postData} />
            </div>
          );
        })}
      </div>
      <div className="paginate">
        <Paginate
          totalPages={totalPages}
          onClickPageChange={onClickPageChange}
        />
      </div>
    </div>
  );
};

export default HomePage;
