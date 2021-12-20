import React, { useState } from "react";

import { toast } from "react-toastify";

import s from "./Searchbar.module.css";
import sprite from "../../images/svg_sprite.svg";
import Button from "../Button/Button";

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  const onInputSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() === "") {
      setSearchValue("");
      toast("Please type something to find article you want");
      return;
    }
    onSubmit(searchValue);
    setSearchValue("");
  };

  return (
    <header className={s.searchbar}>
      <form onSubmit={onInputSubmit} className={s.searchForm}>
        <label className={s.formLabel}>
          Filter by keywords
          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            name="Filter by keywords"
            placeholder="Type keywords here"
            value={searchValue}
            onChange={onChange}
          />
          <svg className={s.icon} width="20px" height="20px">
            <use href={sprite + "#icon-vector"}></use>
          </svg>
        </label>
        <Button type="submit">search</Button>
      </form>
    </header>
  );
};

export default Searchbar;
