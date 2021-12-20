import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import * as articlesApi from "../../api/articlesApi";
import s from "./HomePage.module.css";
import sprite from "../../images/svg_sprite.svg";
import Searchbar from "../../components/Searchbar/Searchbar";
import Section from "../../components/Section/Section";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState(() => {
    const saved = localStorage.getItem("value");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [articles, setArticles] = useState(null);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(searchValue));
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    articlesApi.fetchArticlesByValue(searchValue).then((articles) => {
      if (articles.length === 0) {
        toast(`Sorry, there is no articles about ${searchValue}!`);
        return;
      } else setArticles(articles);
    });
  }, [searchValue]);

  return (
    <>
      <Section>
        <Searchbar onSubmit={setSearchValue} />

        {articles && (
          <>
            <h1 className={s.title}>Result:{articles.length}</h1>
            <ul className={s.articlesList}>
              {articles.map((article) => (
                <li className={s.articleCard} key={article.id}>
                  <Link
                    className={s.articleCardText}
                    to={{
                      pathname: `/${article.id}`,
                      state: {
                        from: location,
                      },
                    }}
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className={s.articleCardImage}
                    />
                    <div className={s.cardText}>
                      <p className={s.date}>
                        {moment(article.publishedAt).format("MMMM Do, YYYY")}
                      </p>
                      <svg className={s.icon} width="16px" height="16px">
                        <use href={sprite + "#icon-calendar"}></use>
                      </svg>
                      <h2 className={s.articleCardTitle}>{article.title}</h2>
                      <p className={s.summary}>
                        {article.summary.substring(0, 100) + "..."}
                      </p>
                      <p className={s.read}>Read more &#x2192;</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>
    </>
  );
};

export default HomePage;
