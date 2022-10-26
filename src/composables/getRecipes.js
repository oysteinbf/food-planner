import { ref } from '@vue/reactivity'

const getRecipes = () => {
    const recipes = ref([])
    const error = ref(null) // for å fange feil

    const load = async() => {
      try {
        let data = await fetch('http://localhost:3000/recipes')
        if (!data.ok) {
          throw Error('No data available')
        }
        recipes.value = await data.json()
      }
      catch (err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    //load()

    return { recipes, error, load}
}

export default getRecipes