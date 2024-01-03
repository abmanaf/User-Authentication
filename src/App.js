import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  //add new movies
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newreleaseDate, setNewReleasedDate] = useState(0);
  const [isNewMovie, setIsnewMovie] = useState(false);

  const moviesCollectionRef = collection(db, "Movies");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filtrationOfData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filtrationOfData);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    const movieDoc = doc(db, "Movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const handleSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Title: newMovieTitle,
        releaseDate: newreleaseDate,
        receivedAnBaba: isNewMovie,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {" "}
      <Login />
      <br />
      <div>
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Data"
          type="number"
          onChange={(e) => setNewReleasedDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovie}
          onChange={(e) => setIsnewMovie(e.target.checked)}
        />{" "}
        Received Baba
        <button onClick={handleSubmitMovie}>Add</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnBaba ? "green" : "red" }}>
              {movie.Title}
            </h1>
            <p>Data: {movie.releaseDate}</p>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
