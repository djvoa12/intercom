import Ember from 'ember';

const { $, Route } = Ember;

export default Route.extend({
  model() {
    return $.get('assets/customers.txt').then((response) => {
      let filteredReponse = response.replace(/'/g, '"'); // for mock data JSON parsing
      let array = filteredReponse.split('\n');
      let customers = array.slice(0, array.length - 1);

      return customers.map((customer) => {
        return JSON.parse(customer);
      });
    });
  }
});
