import Ember from 'ember';

const { Controller, computed } = Ember;
const { filter, sort } = computed;

export default Controller.extend({
  officeLatitude: '53.3381985',

  officeLongitude: '-6.2592576',

  limit: 100, // kilometers

  radius: 6371,  // kilometers

  getRadians(degrees) {
    return degrees * (Math.PI/180);
  },

  getDistance(latitude, longitude) {
    let lat1 = this.get('officeLatitude');
    let lat2 = latitude;
    let long1 = this.get('officeLongitude');
    let long2 = longitude;

    let φ1 = this.getRadians(lat1);
    let φ2 = this.getRadians(lat2);

    let Δφ = this.getRadians(lat2 - lat1);
    let Δλ = this.getRadians(long2 - long1);

    let innerCalc = (Math.sin(Δφ/2) * Math.sin(Δφ/2)) + (Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2));
    let centralAngle = 2 * Math.atan2(Math.sqrt(innerCalc), Math.sqrt(1-innerCalc));

    return (this.get('radius') * centralAngle).toFixed(8);
  },

  validCustomers: filter('model', function(customer) {
    let distance = this.getDistance(customer.latitude, customer.longitude);
    let limit = this.get('limit');

    if (distance < limit) {
      return customer;
    }
  }),

  validCustomersSorting: ['user_id'],

  sortedValidCustomers: sort('validCustomers', 'validCustomersSorting')
});
