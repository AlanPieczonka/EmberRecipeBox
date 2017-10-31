import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        switchRoute(route){
            this.transitionToRoute(`/${route}`);
        }
    }
});
