import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:invitation', {
  unit: true
});

let customers = [{
  user_id: 100,
  latitude: '54.080556',
  name: 'Eoin Gallagher',
  longitude: '-6.361944'
}, {
  user_id: 40,
  latitude: '51.92893',
  name: 'Alice Cahill',
  longitude: '-10.27699'
}, {
  user_id: 1,
  latitude: '54.180238',
  name: 'Patricia Cahill',
  longitude: '-5.920898'
}];

test('defualt properties are correct', function(assert) {
  assert.expect(5);

  const controller = this.subject();

  const officeLatitude = controller.get('officeLatitude');
  const officeLongitude = controller.get('officeLongitude');
  const limit = controller.get('limit');
  const radius = controller.get('radius');
  const validCustomersSorting = controller.get('validCustomersSorting');

  assert.equal(officeLatitude, '53.3381985');
  assert.equal(officeLongitude, '-6.2592576');
  assert.equal(limit, 100);
  assert.equal(radius, 6371);
  assert.deepEqual(validCustomersSorting, ['user_id']);
});

test('`getRadians` method works', function(assert) {
  assert.expect(1);

  const controller = this.subject();

  const degrees = '53';
  const result = controller.getRadians(degrees);

  assert.equal(result, 0.9250245035569946);
});

test('`getDistance` method works', function(assert) {
  assert.expect(1);

  const controller = this.subject();

  const latitude = '52.833502';
  const longitude = '-8.522366';
  const result = controller.getDistance(latitude, longitude);

  assert.equal(result, 161.21674292);
});

test('`validCustomers` & `sortedValidCustomers` computed properties work', function(assert) {
  assert.expect(2);

  const controller = this.subject({
    model: customers
  });

  const result1 = [{
    user_id: 100,
    latitude: '54.080556',
    name: 'Eoin Gallagher',
    longitude: '-6.361944'
  }, {
    user_id: 1,
    latitude: '54.180238',
    name: 'Patricia Cahill',
    longitude: '-5.920898'
  }];

  const result2 = [{
    user_id: 1,
    latitude: '54.180238',
    name: 'Patricia Cahill',
    longitude: '-5.920898'
  }, {
    user_id: 100,
    latitude: '54.080556',
    name: 'Eoin Gallagher',
    longitude: '-6.361944'
  }];

  assert.deepEqual(controller.get('validCustomers'), result1, 'results are filtered correctly');
  assert.deepEqual(controller.get('sortedValidCustomers'), result2, 'results are sorted correctly');
});
