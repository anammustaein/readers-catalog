import React, {useState, useCallback, useContext, createContext, useEffect} from 'react';
// import axios from 'axios';
import noCoverImage from '../../images/no_cover-M.jpg';

const URL = "http://openlibrary.org/search.json?title=";

const SearchContext = createContext(null);

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    
    if(context === undefined) {
        throw new Error("SearchContext must be within SearchContextProvider");
    }

    return context;
};

export const SearchContextProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("harry%20potter");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultTitle, setResultTitle] = useState("");

    const fetchBooks = useCallback(async() => {
        try {
            const res = await axios.get(`${URL}${searchTerm}`);
            const data = await res.data.docs;
            // console.log(data);
            // console.log(searchTerm);

            if(data) {
                const newBooks = data.slice(0, 100).map((singleBook) => {
                    const {id, title, author_name, cover_img} = singleBook;

                    return {
                        id: (singleBook.key).replace("/works/", ""),
                        title: title,
                        author_name: author_name,
                        cover_img: singleBook.cover_i ? `https://covers.openlibrary.org/b/id/${singleBook.cover_i}-M.jpg` : noCoverImage,
                    }
                });

                setBooks(newBooks);

                if(newBooks.length > 1) {
                    setResultTitle(`Results for ${searchTerm}`);
                } else {
                    setResultTitle("No search results found");
                }
            } else {
                setBooks([]);
                setResultTitle("No search results found");
            }
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }) [searchTerm, fetchBooks];

    return (
        <SearchContext.Provider value = {{loading, books, setSearchTerm, resultTitle, setResultTitle,}}>
            {children}
        </SearchContext.Provider>
    )
};

