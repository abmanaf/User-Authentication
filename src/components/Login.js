import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, signOut } from "firebase/auth";
import { auth, db, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function Login({ movieList, setMovieList }) {
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newreleaseDate, setNewReleasedDate] = useState(0);
  const [isNewMovie, setIsnewMovie] = useState(false);
  const navigate = useNavigate();
  const [updateMovieTitle, setUpdateMovieTitle] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);

  const moviesCollectionRef = collection(db, "Movies");

  const handleSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Title: newMovieTitle,
        releaseDate: newreleaseDate,
        receivedAnBaba: isNewMovie,
        userId: auth?.currentUser?.uid,
      });
      // Fetch movie list after addition
      await fetchMovieList();
    } catch (err) {
      console.error(err);
      // Handle errors here, e.g., show an alert or log a message
    }
  };

  // Define the fetchMovieList function
  const fetchMovieList = async () => {
    try {
      console.log("Current User ID:", auth.currentUser?.uid);
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

  useEffect(() => {
    // Call fetchMovieList on component mount
    fetchMovieList();
  }, [moviesCollectionRef, setMovieList]);

  const handleDelete = async (id, userId) => {
    try {
      // Check if the user has permission to delete
      if (auth.currentUser?.uid === userId) {
        const movieDoc = doc(db, "Movies", id);
        await deleteDoc(movieDoc);
        await fetchMovieList(); // Update the movie list after deletion
      } else {
        console.log("You don't have permission to delete this movie.");
      }
    } catch (error) {
      console.error("Error deleting movie:", error.message);
    }
  };

  /*
  const onHandleUpdate = async (id) => {
    const movieDoc = doc(db, "Movies", id);
    await updateDoc(movieDoc, { Title: updateMovieTitle });
    fetchMovieList(); // Update the movie list after update
  };
  */
  const onHandleUpdate = async (id, userId) => {
    // Check if the user has permission to update
    if (auth.currentUser?.uid === userId) {
      const movieDoc = doc(db, "Movies", id);
      await updateDoc(movieDoc, { Title: updateMovieTitle });
      fetchMovieList(); // Update the movie list after update
    } else {
      console.log("You don't have permission to update this movie.");
    }
  };

  const handleSubmitFile = async () => {
    if (!uploadFile) return;
    const fileFolder = ref(storage, `ProjectFiles/${uploadFile.name}`);
    try {
      await uploadBytes(fileFolder, uploadFile);
    } catch (err) {
      console.error(err);
    }
  };

  const LogOut = async () => {
    window.alert(
      `Hi ${auth?.currentUser?.email} are you sure you want to log out`
    );
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  //console.log(auth?.currentUser?.uid);

  return (
    <div>
      {" "}
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
        <button onClick={handleSubmitMovie}>Post</button>
        <button onClick={LogOut}>Log Out</button>
      </div>
      <div style={{ border: "1px solid black" }}>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnBaba ? "green" : "red" }}>
              {movie.Title}
            </h1>
            <p>Data: {movie.releaseDate}</p>
            <button onClick={() => handleDelete(movie.id, movie.userId)}>
              Delete
            </button>
            <input onChange={(e) => setUpdateMovieTitle(e.target.value)} />
            <button onClick={() => onHandleUpdate(movie.id, movie.userId)}>
              Update
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
        <button onClick={handleSubmitFile}>Upload File</button>
      </div>
    </div>
  );
}

export default Login;
