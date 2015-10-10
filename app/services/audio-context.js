/* globals AudioContext: true, webkitAudioContext */

export default {
  create() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    }
    catch(e) {
      debugger;
      alert('Web Audio API is not supported in this browser');
    }
  },

  config: null,
  isServiceFactory: true
};
