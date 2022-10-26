<template>

  <div v-if="props.show" class="backdrop" @click.self="closeModal">
    <div class="modal">
      <h2>{{ props.name }}</h2>
      <!-- Make grey / crossed out on click-->
      <h3>Ingredienser</h3>{{ props.ingredients }}
      <h3>Fremgangsmåte</h3>{{ props.directions }}
    </div>
  </div>

 <div v-else>
  <!-- <h2>{{ props.name }}</h2>
  <p>id: {{ props.id }}</p>
  <p>isFav: {{ props.isFav }}</p>
  <p>show: {{ props.show }}</p> -->
  </div> 




</template>

<script setup>

const props = defineProps({
    name: String,
    id: Number,
    show: Boolean,
    ingredients: String,
    directions: String,
    isFav: Boolean
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}


</script>

<style>

.modal {
    width: 500px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
}


.modal h3 {
    color: rgb(51, 121, 185);
}

.backdrop {
    top: 0;
    left: 0;
    position: fixed;
    background: rgba(27, 95, 122, 0.7);
    width: 100%; /* Hele browseren */
    height: 100%
}


</style>