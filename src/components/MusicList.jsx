import React, { useRef } from "react";
import Music from "./Music.jsx";
import Search from "./Search.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusicGradient, updateMusic } from "../slices/music.js";
import { noop } from "lodash";
import { Audio } from "react-loader-spinner";
import PropTypes from "prop-types";

const MusicList = ({
  allMusicList: musicList,
  isLoading = false,
  playlistTitle = "",
  setSearchKeyword = noop,
}) => {
  const inputSearch = useRef("");
  const dispatch = useDispatch();
  const currentMusic = useSelector(
    (store) => store.musicReducer.music.currentMusic
  );

  const onSearchChange = (value) => {
    inputSearch.current.value = value;
    setSearchKeyword(value);
  };

  const onMusicTabClick = (music) => {
    const {
      _id: musicId,
      title: musicName,
      playlistTitle,
      photo: musicPhoto,
      url: musicUrl,
      duration: musicDuration,
      artist: musicArtist,
    } = music;
    dispatch(
      updateMusic({
        musicId,
        musicName,
        musicPlayList: playlistTitle,
        musicPhoto,
        musicUrl,
        musicDuration,
        musicArtist,
      })
    );

    dispatch(setCurrentMusicGradient({ gradient: musicId }));
  };

  return (
    <div className="grow sm:flex xl:flex xl:flex-col">
      <div className="text-white grow flex flex-col sm:w-[70%] sm:pt-[18px] overflow-auto">
        <header className="text-[32px] leading-[36px] font-bold pl-4 pt-4">
          {playlistTitle}
        </header>
        <Search inputSearch={inputSearch} onSearchChange={onSearchChange} />
        {isLoading ? (
          <div className="w-[100%] justify-center items-center flex flex-row grow overflow-auto">
            <Audio
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        ) : (
          <div className="justify-start overflow-auto grow">
            {musicList.map((music) => (
              <Music
                key={music._id}
                playlistTitle={playlistTitle}
                currentMusic={currentMusic}
                onMusicTabClick={onMusicTabClick}
                music={music}
              />
            ))}
          </div>
        )}
      </div>
      <MusicPlayer />
    </div>
  );
};

MusicList.propTypes = {
  allMusicList: PropTypes.array,
  isLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  playlistTitle: PropTypes.string,
  setSearchKeyword: PropTypes.func,
};

export default MusicList;
