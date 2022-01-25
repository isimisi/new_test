/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import ReactTextTransition, { presets } from "react-text-transition";
import walking from "@lotties/racoon/walk.json";
import loader from "@lotties/loader.json";

const Loader = ({ bigFont = false }) => {
  const [raccoon, setRaccoon] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "Hidkalder flere vaskebjørne.",
    "Køber mere RAM.",
    "Brygger kaffe til chefen.",
    "Vidste du, at vaskebjørnes masker faktisk hjælper dem med at se bedre?",
    "Vidste du, at vaskebjørne i byer nok er klogere end vaskebjørne på landet?",
    "Vidste du, at vaskebjørne “vasker” maden for at kunne føle den bedre?",
    "Ventetiden vil maksimalt være ∞. Promise!",
    "Øjeblik! Din computer er ikke supermand.",
    "Ingen panik, tak!",
    "Indlæser elevatormusikken.",
    "Kontrollerer tyngdekraften.",
    "Vi prøver din tålmodighed.",
    "Det er stadig hurtigere, end du selv kunne tegne det...",
    "Leverer pizzaer."
  ];

  useEffect(() => {
    setTimeout(() => {
      setRaccoon(true);
    }, 5000);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex(Math.floor(Math.random() * (loadingTexts.length - 0)));
    }, 8000);

    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      {raccoon && (
        <ReactTextTransition
          text={loadingTexts[textIndex]}
          springConfig={presets.wobbly}
          inline
          style={{ marginBottom: 10, fontSize: bigFont ? 20 : 12 }}
        />
      )}
      <Lottie
        animationData={raccoon ? walking : loader}
        style={{
          width: "20%"
        }}
      />
    </div>
  );
};

export default Loader;
