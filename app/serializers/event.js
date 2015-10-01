import DS from 'ember-data';

const { RESTSerializer } = DS;

export default RESTSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    if (resourceHash && resourceHash.occasion) {
      resourceHash.invitedCount = resourceHash.invited_count;
      delete resourceHash.invited_count;

      return this._super(modelClass, resourceHash, prop);
    }

    return this._super.apply(this, arguments);
  }
});
