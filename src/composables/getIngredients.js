import { ref } from '@vue/reactivity'

const getIngredients = (id) => {
    const ingredients = ref(null)
    const error = ref(null)
       
    const loadIngredient = async() => {
      try {
        let data = await fetch('http://localhost:8000/ingredient/' + id)
        if (!data.ok) {
          throw Error('Ingredients not found')
        }
        ingredients.value = await data.json()
        // Add field for marking an ingredient as complete
        ingredients.value.forEach(element => {
          element.isCompleted = false
        });
      }
      catch (err) {
        error.value = err.message
        console.log(error.value)
      }
    }

    return { ingredients, error, loadIngredient}
}

export default getIngredients