import Ember from 'ember';

export default Ember.Component.extend({
  hovering: false,
  setFile: null,

  dragStart: e => e.preventDefault(),
  drag: e => e.preventDefault(),
  dragOver: e => e.preventDefault(),

  dragEnter: function(e) {
    e.preventDefault();
    this.set('hovering', true);
  },

  dragLeave: function(e) {
    e.preventDefault();
    this.set('hovering', false);
  },

  drop: function(e) {
    e.preventDefault();
    this.set('hovering', false);

    this.setFile(e.dataTransfer.files[0]);
  }
});
