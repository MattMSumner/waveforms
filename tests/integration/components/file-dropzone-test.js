import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('file-dropzone', 'Integration | Component | file dropzone', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{file-dropzone}}`);

  assert.equal(this.$().text().trim(), '');
});
