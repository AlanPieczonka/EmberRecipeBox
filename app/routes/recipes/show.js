import Ember from 'ember';

import { inject as service } from '@ember/service';

export default Ember.Route.extend({
    db: service(),
    model(params){
        return this.get('db').getSingleRecipe(params.id);
    },
});
