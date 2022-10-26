import { ref } from '@vue/reactivity'

const getRecipe = (id) => {
    const recipe = ref(null)
    const error = ref(null) // for å fange feil
       
    const load = async() => {
      try {
        let data = await fetch('http://localhost:3000/recipes/' + id)
        if (!data.ok) {
          throw Error('Recipe does not exist')
        }
        recipe.value = await data.json()
      }
      catch (err) {
        error.value = err.message
        console.log(error.value)
      }
    }

    return { recipe, error, load}
}

export default getRecipe
