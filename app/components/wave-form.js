import Ember from 'ember';

export default Ember.Component.extend({
  file: null,
  arrayBuffer: null,
  audioContext: Ember.inject.service(),
  sampleRate: 6000,
  sampleRatePreview: 6000,

  svgPath: Ember.computed('buffer', 'sampleRate', function() {
    const buffer = this.get('buffer');

    if (buffer) {
      const sampleRate = this.get('sampleRate');
      const peaks = this._getPeaks(sampleRate, buffer);
      const totalPeaks = peaks.length;

      let d = '';
      for(let peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
        if (peakNumber%2 === 0) {
          d += ` M${~~(peakNumber/2)}, ${peaks.shift()}`;
        } else {
          d += ` L${~~(peakNumber/2)}, ${peaks.shift()}`;
        }
      }
      return d;
    }
  }),

  didReceiveAttrs({oldAttrs, newAttrs}) {
    const file = newAttrs.file.value;

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = progressEvent => {
        this.get('audioContext').decodeAudioData(progressEvent.currentTarget.result, buffer => {
          this.set('buffer', buffer);
        });
      };

      fileReader.onerror = function() {
        alert("Couldn't load file");
      };

      fileReader.readAsArrayBuffer(file);
    }
  },

  _getPeaks(length, buffer) {
    const sampleSize = buffer.length / length;
    const sampleStep = ~~(sampleSize / 10) || 1;
    const numberOfChannels = buffer.numberOfChannels;
    const mergedPeaks = [];

    for (let channelNumber = 0; channelNumber < numberOfChannels; channelNumber++) {
      const peaks = [];
      const channelData = buffer.getChannelData(channelNumber);

      for (let peakNumber = 0; peakNumber < length; peakNumber++) {
        const start = ~~(peakNumber * sampleSize);
        const end = ~~(start + sampleSize);
        let min = channelData[0];
        let max = channelData[0];

        for (let sampleIndex = start; sampleIndex < end; sampleIndex += sampleStep) {
          const value = channelData[sampleIndex];

          if (value > max) { max = value; }
          if (value < min) { min = value; }
        }

        peaks[2 * peakNumber] = max;
        peaks[2 * peakNumber + 1] = min;

        if (channelNumber === 0 || max > mergedPeaks[2 * peakNumber]) {
          mergedPeaks[2 * peakNumber] = max;
        }

        if (channelNumber === 0 || min < mergedPeaks[2 * peakNumber + 1]) {
          mergedPeaks[2 * peakNumber + 1] = min;
        }
      }
    }

    return mergedPeaks;
  },
});
