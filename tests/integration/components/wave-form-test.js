import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wave-form', 'Integration | Component | wave form', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wave-form}}`);

  assert.equal(this.$().text().trim(), '');
});
