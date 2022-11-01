<template>
  <div class="home">
    <img alt="Logo" src="../assets/food-planner-logo.png" width="150" height="200">
<h2>Hello!</h2>
<div class="grid-container">
  <div class="item1">
  <input type="text" v-model="searchInput" placeholder="Søk oppskrifter..." />
  <div class="recipe-box" v-for="recipe in filteredList()" :key="recipe.id" :class="{ fav: recipe.isFav }" @click.ctrl="toggleShow(recipe)">
          <h2>{{ recipe.name }}</h2>
          <Recipe v-bind="recipe" @close="toggleShow(recipe)"/>
          <button @click="toggleFav(recipe)">
            <span v-if="!recipe.isFav">Legg til meny</span>
            <span v-if="recipe.isFav">Fjern fra meny</span>
          </button>
          <button @click="toggleShow(recipe)">Detaljer</button>
       </div>

  <div v-if="searchInput&&!filteredList().length">
     <p>Ingen oppskrifter funnet!</p>
  </div>
  </div>

  <div class="item2">

  Valgte retter:
  <div class="recipe-box" v-for="recipe in favRecipies" :key="recipe.id" :class="{ fav: recipe.isFav }" @click.ctrl="toggleShow(recipe)">
          <h2>{{ recipe.name }}</h2>
          <Recipe v-bind="recipe" theme="favTheme" @close="toggleShow(recipe)"/>
          <button @click="toggleFav(recipe)">Fjern fra meny</button>
          <button @click="toggleShow(recipe)">Detaljer</button>
       </div>

  </div>

  <div class="item3">Footer
    <div v-for="recipe in favRecipies" :key="recipe.id">
    {{ recipe.name }}
  </div>
  <button @click="saveFavorites(recipes)">Lagre favoritter</button>
  </div>
  </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// @ is an alias to /src
import Recipe from '@/components/Recipe.vue'
import getRecipes from '@/composables/getRecipes'

const {recipes, error, load} = getRecipes()
load()

let searchInput = ref("");
// Kan også bruke computed: https://vuejs.org/guide/essentials/computed.html#computed-caching-vs-methods
function filteredList() { // Kan også lage denne som en "composable"
  return recipes.value.filter((recipe) =>
   (recipe.name.toLowerCase().includes(searchInput.value.toLowerCase()) && (!recipe.isFav))
  );
}

// Liste med oppskrifter som er markert som favoritter
const favRecipies = computed(() => {
  return recipes.value.filter((recipe) => recipe.isFav)
})

// Bruker dette for å vise detaljer
function toggleShow(recipe) {
  return recipe.show = !recipe.show
}

// Bruker dette for å velge ukesmeny osv.
function toggleFav(recipe) {
  return recipe.isFav = !recipe.isFav
}

// Oppdater favoritter (som senere brukes til lage handleliste (kan også gjøres her?)
function saveFavorites(recipes) {
  console.log('PUT request som oppdaterer favoritt-status')
}

</script>

<style>
.item1 { grid-area: left; }
.item2 { grid-area: right; }
.item3 { grid-area: footer; }

.grid-container {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  grid-template-areas:
    'left right'
    'footer footer';
  gap: 10px;
  background-color: #2196F3;
  padding: 10px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
}

.recipe-box {
  background: rgb(140, 197, 219);
  margin: 10px 10px;
  padding: 10px 5px;
}

button {
display: inline-block;
padding: 15px 25px;
font-size: 14px;
cursor: pointer;
text-align: center;
text-decoration: none;
outline: none;
color: #fff;
background-color: #4CAF50;
border: none;
border-radius: 15px;
box-shadow: 0 9px #999;
}

button:hover {background-color: #3e8e41}

button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

</style>