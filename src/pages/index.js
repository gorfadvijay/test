import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Home from "../pages/Home/Home";

import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const CloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Head>
        <title>Interview</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Home isOpen={isOpen} openModal={openModal} CloseModal={CloseModal} />
    </>
  );
}
