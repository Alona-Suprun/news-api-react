import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import s from "./ArticleDetailsPage.module.css";
import * as articlesApi from "../../api/articlesApi";

const ArticleDetailsPage = () => {
  const [articleDetails, setArticleDetails] = useState(null);
  const { articleId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (articleId) {
      articlesApi.fetchArticleDetails(articleId).then(setArticleDetails);
    }
  }, [articleId]);

  return (
    <>
      {articleDetails && (
        <>
          <img
            className={s.articleDetailsImage}
            src={articleDetails.imageUrl}
            alt={articleDetails.title}
          />
          <div className={s.articleDetailsText}>
            <h2 className={s.articleDetailsTitle}>{articleDetails.title}</h2>
            <p className={s.text}>{articleDetails.summary}</p>
            <Link
              to={{
                pathname: `/`,
                state: {
                  from: location,
                },
              }}
              className={s.goBack}
            >
              &#x2190; Back to homepage
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default ArticleDetailsPage;
