import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const Music = ({ music, currentMusic, onMusicTabClick, playlistTitle }) => {
  const { musicName } = currentMusic;

  const { title, photo, duration, artist } = music;

  const selectedClassName = classNames("grow flex flex-col cursor-pointer", {
    "bg-[#262B35]": musicName == title,
  });

  const minutes = Number(Math.floor(Number(duration) / 60));
  const seconds = Number(Number(duration) % 60);

  return (
    <div
      className={selectedClassName}
      onClick={() => onMusicTabClick({ ...music, playlistTitle })}
    >
      <div className="p-[16px] flex flex-row justify-between">
        <div className="flex flex-row">
          <div>
            <img src={photo} alt="image-4" border="0" className="h-[48px]" />
          </div>
          <div className="flex flex-col ml-4">
            <div className="font-[18px] cursor-pointer">{title}</div>
            <div className="font-[14px] text-gray-500 cursor-pointer">
              {artist}
            </div>
          </div>
        </div>
        <div className="text-gray-500 font-[18px] pl-4">{`${minutes}:${seconds}`}</div>
      </div>
    </div>
  );
};

Music.propTypes = {
  music: PropTypes.object,
  currentMusic: PropTypes.object,
  onMusicTabClick: PropTypes.func,
  playlistTitle: PropTypes.string,
};

export default Music;
