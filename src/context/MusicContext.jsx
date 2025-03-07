import React, { createContext, useState } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [bgColor, setBgColor] = useState("#000");

  return (
    <MusicContext.Provider
      value={{ currentSong, setCurrentSong, bgColor, setBgColor }}
    >
      {children}
    </MusicContext.Provider>
  );
};
