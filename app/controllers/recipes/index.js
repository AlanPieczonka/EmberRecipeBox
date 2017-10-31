import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        switchRoute(lastID){
            this.transitionToRoute(`/recipes/${lastID}`);
        }
    }
});
