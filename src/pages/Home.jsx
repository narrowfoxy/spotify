import React from "react";
import TopBar from "../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { sideModalKey } from "../constant/modalKeys";
import { openModal } from "../slices/modals.js";
import MainSection from "../components/MainSection";
import classNames from "classnames";
import songGradient from "../utils/songsGradient";

const Home = () => {
  const dispatch = useDispatch();

  const currentMusicGradient = useSelector(
    (store) => store.musicReducer.music.currentMusicGradient
  );

  const currentMusicId = useSelector(
    (store) => store.musicReducer.music.currentMusic.musicId
  );

  const isOpen = !!useSelector(
    (store) => store.modalReducer.modalKeys[sideModalKey]
  );

  const anyWhereHomeClick = (e) => {
    e.stopPropagation();
    if (isOpen) {
      dispatch(openModal({ key: sideModalKey, value: !isOpen }));
    }
  };

  const updatedClass = classNames("h-[100vh] flex flex-col", {
    "bg-black-1": !songGradient[currentMusicId],
  });



  return (
    <div
      style={{
        backgroundImage: `linear-gradient(${songGradient[currentMusicId]})`,
      }}
      onClick={(e) => anyWhereHomeClick(e)}
      className={updatedClass}
    >
      <TopBar />
      <MainSection />
    </div>
  );
};

export default Home;
