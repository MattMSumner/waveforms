import Ember from 'ember';

export default Ember.Controller.extend({
  file: null,

  actions: {
    setFile(file) {
      this.set('file', file);
    },
  },
});
