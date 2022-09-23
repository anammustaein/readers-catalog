import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../API';
import { useFavContext } from './context/FavContext';
import noCoverImage from '../images/no_cover-M.jpg';
import '../App';

const BookList = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("Harry Potter");

    const { favourites, addToFavs, removeFromFavs } = useFavContext();

    const navigate = useNavigate();

    let booksWithCovers = books.map((singleBook) => {
        return {
            ...singleBook,
            id: (singleBook.key).replace("/works/", ""),
            cover_img: singleBook.cover_i ? `https://covers.openlibrary.org/b/id/${singleBook.cover_i}-M.jpg` : noCoverImage
        }
    });

    const favouritesChecker = (id) => {
        const boolean = favourites.some((book) => book.id ===id);
        return boolean;
    }

    useEffect(() => {
        axios.get(API_URL).then(res => {
            console.log(res.data.docs);
            setBooks(res.data.docs);
            setLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    if (loading) {
        return (
            <div className="book-list">
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div>
                <div className="search-result-title">
                    <h1>Results for: {searchTerm}</h1>
                </div>
                <div className="book-list">
                    {booksWithCovers.slice(0, 100).map((book) => (
                    <div key={book.id} className="book-container">
                        <div>
                            <img src={book.cover_img} alt="#" className="book-img" onClick={() => navigate(`/books/${book.id}`)} />
                        </div>
                        <div className="book-title-author">
                        <div><h3>{book.title}</h3></div>
                        <div className="book-author"><h4>by {book.author_name}</h4></div>
                        </div>
                        <div>
                            {favouritesChecker(book.id) ? (
                            <button className="button-remove" onClick={()=> removeFromFavs(book.id)}>
                                Remove From Favourites
                            </button>
                            ) : (                          
                            <button onClick={()=> addToFavs(book)}>
                                Add to Favourites
                            </button>
                            )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>

        )
    }
};

export default BookList;