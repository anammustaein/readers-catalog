import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BOOK_DETAILS_URL } from '../API';
import {FaArrowLeft} from "react-icons/fa";
import noCoverImage from '../images/no_cover-M.jpg';

function BookDetails() {

  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try {
        const res = await axios.get(`${BOOK_DETAILS_URL}${id}.json`);
        const data = await res.data;
        console.log(data);

        if(data) {
          const {description, title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            description: description ? description : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-M.jpg` : noCoverImage,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found"
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if(loading) { 
    return (
    <div className="book-details">
      <h1>Loading...</h1>
    </div>
  )};

  return (
    <div className="book-details">
      <div className="button-container">
        <button type="button" onClick={() => navigate(-1)}>
          <FaArrowLeft size={18} /> 
        </button>
      </div>
      <div className="book-details-img-container">
        <img src={book?.cover_img} alt="cover image" className="book-img-enlarged"/>
      </div>
      <div className="details-container">
        <h3>{book?.title}</h3>
        <br></br>
        <p><b>Description:</b></p>
        <p>{book?.description}</p>
        <br></br>
        <p><b>Subject Places:</b></p>
        <p>{book?.subject_places}</p>
        <br></br>
        <p><b>Subject Times:</b></p>
        <p>{book?.subject_times}</p>
        <br></br>
        <p><b>Subjects: </b></p>
        <p>{book?.subjects}</p>
      </div>
    </div>
  )
}

export default BookDetails;