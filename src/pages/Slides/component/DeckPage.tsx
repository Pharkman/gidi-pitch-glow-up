import React, { useState } from "react";
import DeckProgress from "./DeckProgress";
import PitchSlide from "../PitchSlide";


const DeckPage = () => {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      {!isReady ? (
        <DeckProgress onComplete={() => setIsReady(true)} />
      ) : (
        <PitchSlide />
      )}
    </>
  );
};

export default DeckPage;
