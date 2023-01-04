/**
 * Sends a put request to the database API with the IDs of all recipes that are
 * marked as favourites
 * 
 * Example body:
 *  { "ids": [1,2,6] }
 */
import { ref } from '@vue/reactivity'

const errorMethod = ref(null)

async function putFavourites(recipes) {
    try {
        const favIDs = recipes.filter(item => item.isFav === true).map(item => item.id) // All IDs for the favourites
        const response = await fetch('http://localhost:8000/favourites', {
        method: 'PUT',
        body: JSON.stringify({
            "ids": favIDs
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
  
    } catch (err) {
        errorMethod.value = err.message
        console.log(errorMethod.value)
    }
  }

export default putFavourites