<template>

  <div v-if="props.show" class="backdrop" @click.self="closeModal">
    <div class="modal" :class="{ favTheme: theme === 'favTheme' }">
      <h2>{{ props.name }}</h2>
      <span>{{ props.introduction }} </span>

      <h3>Ingredienser</h3>
      <p>Antall porsjoner: <input type="number" min=1 v-model.number="new_n_servings" /></p>
      <div v-for="ingredient in ingredients" :key="ingredient.name" >
        <!-- Mark as completed on click -->
        <li :class="{ completed: ingredient.isCompleted }" @click="toggleCompleted(ingredient)">
          {{ ingredient.name }}: {{ newAmount(ingredient.amount, props.n_servings, new_n_servings) }} {{ ingredient.unit }}<span v-if="ingredient.preparation_info">, {{ingredient.preparation_info}}</span>
          
        </li>
      </div>

      <h3>Fremgangsmåte</h3>
        <ol>
      <div v-for="step in method" :key="step.id">
        <li :class="{ completed: step.isCompleted }" @click="toggleCompleted(step)">
          {{ step.step_description }}
        </li>
      </div>
        </ol>
    </div>
  </div>

 <div v-else>
  <!-- Not relevant?  -->
  </div> 

</template>

<script setup>

import getIngredients from '@/composables/getIngredients'
import getMethod from '@/composables/getMethod'
import { ref, onMounted } from 'vue'

const {ingredients, error, loadIngredient} = getIngredients(props.id)
loadIngredient()

const {method, errorMethod, loadMethod} = getMethod(props.id)
loadMethod()

const props = defineProps({
    name: String,
    introduction: String,
    id: Number,
    n_servings: Number,
    show: Boolean,
    theme: String
})

const emit = defineEmits(['close'])

// To begin with, set the number of servings to the default value in the database
const new_n_servings = ref()
onMounted(() => {
  new_n_servings.value = props.n_servings
})

// Calculate the new amount based on the number of servings the user chooses (n_new)
function newAmount(amount, n_old, n_new) {
  return (amount/n_old)*n_new
}

function closeModal() {
  emit('close')
}

function toggleCompleted (ingredient) {
  ingredient.isCompleted = !ingredient.isCompleted
}

</script>

<style>

.modal {
    width: 500px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
    /* https://stackoverflow.com/questions/10476632/how-to-scroll-the-page-when-a-modal-dialog-is-longer-than-the-screen */
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}

.modal h3 {
    color: rgb(51, 121, 185);
}

.modal.favTheme h3 {
    color: rgb(70, 170, 45);
}

.backdrop {
    top: 0;
    left: 0;
    position: fixed;
    background: rgba(27, 95, 122, 0.7);
    width: 100%; /* Hele browseren */
    height: 100%
}

ol {
  /* text-align: left; */
  margin: 0; padding: 0;
}

li.completed {
  color: grey;
  text-decoration: line-through
}

input[type=number] {
  width:38px;
  border-radius:10px;
}

</style>