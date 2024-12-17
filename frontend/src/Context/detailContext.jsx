import { createContext, useState, useContext } from "react";
const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  const [ratingCount,setRatingCount]=useState(null)
  const [averageRating,setAverageRating]=useState(null)

  return (
    <DetailContext.Provider
      value={{
        ratingCount,
        setRatingCount,
        averageRating,
        setAverageRating
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};

export const useDetail = () => useContext(DetailContext);