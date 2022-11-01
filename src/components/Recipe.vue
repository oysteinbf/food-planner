<template>

  <div v-if="props.show" class="backdrop" @click.self="closeModal">
    <div class="modal" :class="{ favTheme: theme === 'favTheme' }">
      <h2>{{ props.name }} ({{props.category}})</h2>
      <span>{{ props.introduction }} </span>

      <h3>Ingredienser</h3>
      <div v-for="ingredient in ingredients" :key="ingredient.name" >
        <!-- Mark as completed on click -->
        <li :class="{ completed: ingredient.isCompleted }" @click="toggleCompleted(ingredient)">
          {{ ingredient.name }}: {{ ingredient.amount }} {{ ingredient.unit }}
        </li>
      </div>

      <h3>Fremgangsmåte</h3>{{ props.directions }}
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

const {ingredients, error, loadIngredient} = getIngredients(props.id)
loadIngredient()

const {method, errorMethod, loadMethod} = getMethod(props.id)
loadMethod()

const props = defineProps({
    name: String,
    category: String,
    introduction: String,
    id: Number,
    show: Boolean,
    ingredients: String,
    directions: String,
    theme: String
})

const emit = defineEmits(['close'])

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


</style>