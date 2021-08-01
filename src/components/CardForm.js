import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/cardForm.css";

const CardForm = ({ id, onClose, postData }) => {
  const [companyName, setCompanyName] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: [], error: "" });
  const [price, setPrice] = useState({ value: "", error: "" });

  useEffect(() => {
    const fetchCard = async () => {
      if (id) {
        const res = await axios.get(`http://localhost:3004/giftCards/${id}`);
        setCompanyName({ value: res.data.companyName });
        setPrice({ value: res.data.price });
        setDescription({ value: res.data.description });
      }
    };

    fetchCard();
  }, [id]);

  const createCard = async () => {
    const res = await axios.post("http://localhost:3004/giftCards", {
      companyName: companyName.value,
      price: price.value,
      description: description.value,
    });
    onClose();
    postData(res.data);
  };

  const editCard = async () => {
    const res = await axios.patch(`http://localhost:3004/giftCards/${id}`, {
      companyName: companyName.value,
      price: price.value,
      description: description.value,
    });
    onClose();
    postData(res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (price.value <= 0) {
      return null;
    }

    if (id) {
      return editCard();
    }
    return createCard();
  };

  const validationName = (e) => {
    const value = e.target.value;
    const error = value ? null : "Please Enter Company Name";
    setCompanyName({
      value,
      error,
    });
  };

  const validationPrice = (e) => {
    const value = e.target.value;
    const error = value && value > 0 ? null : "Please Enter Valid Amount";
    setPrice({
      value,
      error,
    });
  };

  const validationDesc = (e) => {
    if (!e.target.value) {
      return setDescription({
        value: [],
        error: "Atlease one Tag value is mandatory",
      });
    }

    const value = e.target.value.split(",");
    setDescription({
      value,
      error: "",
    });
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="labelName">Company Name</label>
          <i className="bi bi-asterisk"></i>
          <input
            type="text"
            className={
              companyName.error ? "form-control is-invalid" : "form-control"
            }
            placeholder="Company Name"
            value={companyName.value}
            onChange={validationName}
          />
          <p className="text-danger"> {companyName.error}</p>
        </div>

        <div className="form-group mt-1">
          <label className="labelName">Price</label>
          <i className="bi bi-asterisk"></i>
          <input
            type="number"
            className={price.error ? "form-control is-invalid" : "form-control"}
            placeholder="Amount in Dollars"
            value={price.value}
            onChange={validationPrice}
          />
          <p className="text-danger"> {price.error}</p>
        </div>

        <div className="form-group mt-1">
          <label className="labelName">Description (Tags)</label>
          <i className="bi bi-asterisk"></i>
          <textarea
            className={
              description.error ? "form-control is-invalid" : "form-control"
            }
            placeholder="Tags"
            rows="1"
            value={description.value}
            onChange={validationDesc}
          ></textarea>
        </div>
        <small className="form-text text-muted">
          Each Tags must be separated by Comma
        </small>
        <p className="text-danger"> {description.error} </p>
      </form>

      <div className="footerButton">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={
            !price.value || !companyName.value || !description.value.length
          }
        >
          Submit
        </button>

        <button className="btn btn-danger ms-1" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CardForm;
