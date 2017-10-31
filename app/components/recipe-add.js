import Ember from 'ember';

import { inject as service } from '@ember/service';

export default Ember.Component.extend({
    db: service(),
    actions: {
        addRecipe(){
             let recipe = this.getProperties('name', 'ingredients', 'imageURL');
             this.get('db').addRecipe(recipe);
             this._resetForm();
             
             const lastID = this.get('db').getLastId();
             this.get('switchRoute')(lastID);
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
