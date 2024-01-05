import React, { useEffect, useState } from "react";
//import Login from "./components/Login";
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
  //uploadFile,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function Login() {
  //const [movieList, setMovieList] = useState([]);

  //add new movies
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newreleaseDate, setNewReleasedDate] = useState(0);
  const [isNewMovie, setIsnewMovie] = useState(false);
  const navigate = useNavigate();

  //const [updateMovieTitle, setUpdateMovieTitle] = useState([]);

  const [uploadFile, setUploadFile] = useState(null);

  const moviesCollectionRef = collection(db, "Movies");
  /*
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
*/
  useEffect(() => {
    //getMovieList();
  }, []);

  const handleSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Title: newMovieTitle,
        releaseDate: newreleaseDate,
        receivedAnBaba: isNewMovie,
        userId: auth?.currentUser?.uid,
      });
      //getMovieList();
    } catch (err) {
      console.error(err);
    }
  };
  /*
  const onHandleUpdate = async (id) => {
    const movieDoc = doc(db, "Movies", id);
    await updateDoc(movieDoc, { Title: updateMovieTitle });
    getMovieList();
  };
  */
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
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const handleViewPosts = () => {
    // Check if the user is signed in
    if (auth.currentUser) {
      // User is signed in, navigate to the Login component
      navigate("/components/Posts");
    } else {
      // User is not signed in, you can handle this case as needed
      console.log("User is not signed in");
    }
  };

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
        <button onClick={handleSubmitMovie}>Add</button>
        <button onClick={handleViewPosts}>View Posts</button>
        <button onClick={LogOut}>Log Out</button>
      </div>
      {/*
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnBaba ? "green" : "red" }}>
              {movie.Title}
            </h1>
            <p>Data: {movie.releaseDate}</p>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
            <input onChange={(e) => setUpdateMovieTitle(e.target.value)} />
            <button onClick={() => onHandleUpdate(movie.id)}>Update</button>
          </div>
        ))}
      </div>
       */}
      <div>
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
        <button onClick={handleSubmitFile}>Upload File</button>
      </div>
    </div>
  );
}

export default Login;
