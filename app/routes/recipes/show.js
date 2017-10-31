import Ember from 'ember';

import { inject as service } from '@ember/service';

export default Ember.Route.extend({
    db: service(),
    model(params){
        return this.get('db').getSingleRecipe(params.id);
    },
    actions: {
        updateRecipe(id, name, ingredients, imageURL){
            const updatedRec = {
                id: id,
                name: name,
                ingredients: ingredients,
                imageURL: imageURL,
            }

            console.log(updatedRec);

            this.get('db').updateRecipe(updatedRec, id);
        }
    }
});
