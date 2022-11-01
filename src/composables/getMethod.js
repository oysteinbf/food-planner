import { ref } from '@vue/reactivity'

const getMethod = (id) => {
    const method = ref(null)
    const errorMethod = ref(null)
       
    const loadMethod = async() => {
      try {
        let data = await fetch('http://localhost:8000/method/' + id)
        if (!data.ok) {
          throw Error('Method not found')
        }
        method.value = await data.json()
        // Add field for marking a step in a method as complete
        method.value.forEach(element => {
          element.isCompleted = false
        });
      }
      catch (err) {
        errorMethod.value = err.message
        console.log(errorMethod.value)
      }
    }

    return { method, errorMethod, loadMethod}
}

export default getMethod