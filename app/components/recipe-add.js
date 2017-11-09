import Ember from 'ember';

import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Ember.Component.extend({
    router: service(),
    db: service(),
    actions: {
        addRecipe(){
             let recipe = this.getProperties('name', 'ingredients', 'imageURL');
             this.get('db').addRecipe(recipe);
             this._resetForm();
             
             const lastID = this.get('db').getLastId();
             get(this, 'router').transitionTo(`/recipes/${lastID}`);
            },
    },
    _resetForm(){
        this.setProperties({
            name: null,
            ingredients: null,
            imageURL: null,
        });
    }
});
