import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import HomePage from "./pages/HomePage/HomePage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage/ArticleDetailsPage";

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader type="Bars" />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:articleId" component={ArticleDetailsPage} />
        </Switch>
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
