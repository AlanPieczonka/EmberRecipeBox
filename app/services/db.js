import Service from '@ember/service';
import { computed } from '@ember/object';
import initialRecipes from './../initialRecipes';

// Big thanks to Michał Staśkiewicz for helping me out with this service

export default Service.extend({
  init() {
    this._super(...arguments);

    if (!localStorage.getItem('recipes')) {
      localStorage.setItem('recipes', '[]');
      initialRecipes.forEach(recipe => this.addRecipe(recipe));
    }

    if (!localStorage.getItem('idCounter')) {
      localStorage.setItem('idCounter', '1');
    }
  },

  recipes: computed(function() {
    return this._fetchRecipes();
  }),

  addRecipe(recipe) {
    const recipes   = this._readFromStorage('recipes');
    const newRecipe = {
      ...recipe,
      ...this._generateIdObject()
    };
    const newRecipes = [...recipes, newRecipe];

    return this._saveToStorage('recipes', newRecipes)
  },

  getSingleRecipe(id){
    const recipes = this._readFromStorage('recipes');
    const singleRecipe = recipes.filter((recipe) => recipe.id == id);

    return singleRecipe;
  },

  getLastId(){
    const lastId = this._readFromStorage('idCounter');
    return lastId;
  },

  removeRecipe(id) {
    const recipes   = this._readFromStorage('recipes');
    const newRecipes = recipes.reject((r) => r.id === id);

    return this._saveToStorage('recipes', newRecipes)
  },

  updateRecipe(recipe){
    const recipes = this._readFromStorage('recipes');
    const index = recipes.findIndex(r => r.id === recipe.id);

    recipes[index] = recipe;

    console.log(recipes);

    return this._saveToStorage('recipes', recipes);

  },

  _fetchRecipes() {
    const storeData = localStorage.getItem('recipes');
    return JSON.parse(storeData);
  },

  _readFromStorage(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  },

  _saveToStorage(key, data) {
    const saved = localStorage.setItem(key, JSON.stringify(data))
    this.notifyPropertyChange('recipes');
    return saved;
  },

  _generateIdObject() {
    const lastId = this._readFromStorage('idCounter');
    const id  = lastId + 1;

    this._saveToStorage('idCounter', id);
    return { id };
  }
});