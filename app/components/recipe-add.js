import Ember from 'ember';

import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Ember.Component.extend({
    router: service(),
    db: service(),
    actions: {
        addRecipe(){
             const recipe = this.getProperties('name', 'ingredients', 'imageURL');
             get(this, 'db').addRecipe(recipe);

             this._resetForm();

             const lastID = get(this, 'db').getLastId();
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
