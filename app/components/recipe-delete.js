import Ember from 'ember';

import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Ember.Component.extend({
    router: service(),
    db: service(),
    actions: {
        deleteRecipe(id){
            this.get('db').removeRecipe(id);
            get(this, 'router').transitionTo('recipes');
        }
    }
 });
