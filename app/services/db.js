import Ember from 'ember';
import { computed } from '@ember/object';
//big thanks to Michał Staśkiewicz for helping me out with this service

const initialRecipes = [
    {
        id: 1,
        name: 'Pizza',
        ingredients: 'Ham, tomato, cheese',
        imageURL: 'https://2.bp.blogspot.com/-K7Q8Fyl4r5U/VsT-pn9R6XI/AAAAAAAA39I/tVaT7aHOzLQ/s1600/pizza.gif'
    },
    {
        id: 2,
        name: 'Lasagne',
        ingredients: 'Pasta, meat, vegetables',
        imageURL: 'https://scm-assets.constant.co/scm/unilever/e9dc924f238fa6cc29465942875fe8f0/28f996d1-0821-44ec-97de-2de86efa897c.jpg'
    }
];

export default Ember.Service.extend({
    init(){
        this._super(...arguments);

        if(!localStorage.getItem('recipes')){
            localStorage.setItem('recipes', []);
            initialRecipes.forEach(recipe => this.addRecipe(recipe));
        }
    },

    recipes: computed(function() {
        return this._fetchRecipes();
    }),


    _fetchRecipes(){
        const storeData = localStorage.getItem('recipes');
        return JSON.parse(storeData);
    }

});
