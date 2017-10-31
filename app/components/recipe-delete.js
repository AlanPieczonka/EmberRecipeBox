import Ember from 'ember';

import { inject as service } from '@ember/service';

export default Ember.Component.extend({
    db: service(),
    actions: {
        deleteRecipe(id){
            this.get('db').removeRecipe(id);
            this.get('switchRoute')('recipes');
        }
    }
 });
