import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
  occasion: attr('string'),
  invitedCount: attr('number'),
  year: attr('number'),
  month: attr('number'),
  day: attr('number'),
  cancelled: attr('boolean', { defaultValue: false })
});
