import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const refs = {};

window.addEventListener('DOMContentLoaded', updatePage);

function updatePage() {
  refs.iframe = document.querySelector('iframe');
  refs.player = new Player(refs.iframe);

  refs.player.on(
    'timeupdate',
    throttle(function (e) {
      setTimeToStorage(e.seconds);
    }, 1000),
  );

  const curTime = getTimeFromStorage();

  if (curTime) {
    refs.player.setCurrentTime(curTime);
  }
}

function setTimeToStorage(time) {
  try {
    window.localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
  } catch (error) {
    console.log(error);
  }
}

function getTimeFromStorage() {
  return JSON.parse(window.localStorage.getItem('videoplayer-current-time'));
}
