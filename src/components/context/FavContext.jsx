import { createContext, useContext } from 'react';
import { useState } from 'react';

const FavContext = createContext(null);

export const useFavContext = () => {
    const context = useContext(FavContext);
    
    if(context === undefined) {
        throw new Error("FavContext must be within FavContextProvider");
    }

    return context;
};

// functional component
export const FavContextProvider = ({children}) => {

    const [favourites, setFavourites] = useState([]);

    const addToFavs = (book) => {
        const oldFavourites = [...favourites];
        const newFavourites = oldFavourites.concat(book);

        setFavourites(newFavourites);
        console.log("clicked");
    };

    const removeFromFavs = (id) => {
        const oldFavourites = [...favourites];
        const newFavourites = oldFavourites.filter((book)=>book.id !== id)

        setFavourites(newFavourites);
    }

    return (
        <FavContext.Provider value={{favourites, addToFavs, removeFromFavs}}>
            {children}
        </FavContext.Provider>
    );
};