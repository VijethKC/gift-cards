import React from "react";

import CardModal from "./CardModal";
import giftImage from "../images/giftImage.jpg";
import "../css/card.css";

const Card = ({ card, postData }) => {
  return (
    <div className="card cardBody">
      <div className="card-header">
        <CardModal
          className="editIcon bi bi-pencil-square"
          id={card.id}
          postData={postData}
        />
        <p>${card.price}</p>
      </div>

      <div className="card-body">
        <div className="cardTitleText">
          <h5 className="card-title">{card.companyName}</h5>
          <div className="tags">
            {card.description.map((ele, index) => {
              return (
                <p className="tag" key={index}>
                  {ele}
                </p>
              );
            })}
          </div>
        </div>
        <img src={giftImage} className="card-img" alt="GIFT CARD" />
      </div>
    </div>
  );
};

export default Card;
