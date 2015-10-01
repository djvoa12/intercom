import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'intercom/tests/helpers/start-app';

module('Acceptance | invitation', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('invitation route model hook and computed properties work', function(assert) {
  assert.expect(5);

  const url = '/invitation';
  const firstGuestId = '.customer-container:first .customer-id';
  const firstGuestName = '.customer-container:first .customer-name';
  const lastGuestId = '.customer-container:last .customer-id';
  const lastGuestName = '.customer-container:last .customer-name';

  visit(url);

  andThen(function() {
    assert.equal(currentURL(), '/invitation');
    assert.equal(find(firstGuestId).text(), 4);
    assert.equal(find(firstGuestName).text(), 'Ian Kehoe');
    assert.equal(find(lastGuestId).text(), 39);
    assert.equal(find(lastGuestName).text(), 'Lisa Ahearn');
  });
});
