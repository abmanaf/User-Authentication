// App.js or your route configuration file
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { useState } from "react";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/components/Login" element={<Login />} />
      <Route
        path="/components/Posts"
        element={<Posts movieList={movieList} setMovieList={setMovieList} />}
      />
    </Routes>
  );
};

export default App;
