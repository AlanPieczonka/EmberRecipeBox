import Service from '@ember/service';
import { computed } from '@ember/object';

const initialRecipes = [
  {
    name: 'Sushi',
    ingredients: 'rice, wasabi, soy sauce',
    imageURL: 'https://newsbook.pl/wp-content/uploads/2016/06/sushi.jpg',
  },
  {
    name: 'Pizza',
    ingredients: 'cheese',
    imageURL: 'https://www.wegmans.com/content/dam/wegmans/products/768/56768.jpg',
  },
  {
    name: 'Lasagne',
    ingredients: 'pasta',
    imageURL: 'https://www.winiary.pl/image.ashx/lasagne-ze-szpinakiem.jpg?fileID=213027&width=800&height=800&frame=True&quality=80bg=0',
  } 
]

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
    console.log('addRecipe ran');
    const recipes   = this._readFromStorage('recipes');
    const newRecipe = {
      ...recipe,
      ...this._generateIdObject()
    };
    const newRecipes = [...recipes, newRecipe];

    return this._saveToStorage('recipes', newRecipes)
  },

  getSingleRecipe(id){
    console.log(id);

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

  updateRecipe(recipe, id){
    const recipes = this._readFromStorage('recipes');
    console.log('Update recipe: ---------')
    console.log(recipe);
    console.log(id);

    console.log("RECIPES DB");
    console.log(recipes);

    const foundIndex = recipes.findIndex(x => x.id === id);

    console.log("FOUND INDEX " + foundIndex);
    recipes[foundIndex] = recipe;

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