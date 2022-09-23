import React, { useReducer, useContext } from "react";
import { useFavContext } from "../components/context/FavContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Favourites = () => {
  const { favourites, addToFavs, removeFromFavs } = useFavContext();

  const navigate = useNavigate();

  const favChecker = (id) => {
    const boolean = favourites.some((book) => book.id === id);
    return boolean;
  };

  return (
    <div>
      <div className="favourites">
        {favourites.length > 0 ? (
          favourites.map((book) => (
            <div key={book.id} className="book-container">
              <div>
                <img
                  src={book.cover_img}
                  alt="#"
                  className="book-img"
                  onClick={() => navigate(`/books/${book.id}`)}
                />
              </div>
              <div className="book-title-author">
                <div>
                  <h3>{book.title}</h3>
                </div>
                <div className="book-author">
                  <h4>by {book.author_name}</h4>
                </div>
              </div>
              <div>
                {favChecker(book.id) ? (
                  <button
                    className="button-remove"
                    onClick={() => removeFromFavs(book.id)}
                  >
                    Remove From Favourites
                  </button>
                ) : (
                  <button onClick={() => addToFavs(book)}>
                    Add to Favourites
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="favourites-result-title">
            <h1>Favourites is empty</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
