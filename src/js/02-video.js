// import Player from '@vimeo/player';
import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
import storageApi from './storage';

// Створіть гравця

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
const KEY_STORAGE = 'videoplayer-current-time';

player.setCurrentTime(storageApi.load(KEY_STORAGE)).then(function(seconds) {
    seconds = storageApi.load(KEY_STORAGE);
});

player.on('timeupdate', throttle(function(event) {  
    storageApi.save(KEY_STORAGE, event.seconds);
}, 1000));
