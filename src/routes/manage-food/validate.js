function validate(food) {
  if (!food.name) {
    return { valid: false, message: 'Name is missing' }
  }

  if (
    food.protein === null ||
    food.protein === '' ||
    Number.isNaN(food.protein)
  ) {
    return { valid: false, message: 'Protein is missing' }
  }

  if (
    food.protein === null ||
    food.protein === '' ||
    Number.isNaN(food.protein)
  ) {
    return { valid: false, message: 'Carbs is missing' }
  }

  if (food.carbs === null || food.carbs === '' || Number.isNaN(food.carbs)) {
    return { valid: false, message: 'Carbs is missing' }
  }

  if (food.fat === null || food.fat === '' || Number.isNaN(food.fat)) {
    return { valid: false, message: 'Fat is missing' }
  }

  return { valid: true, message: '' }
}

// does food exist in food list? return it's index or -1
const foodExist = (name, food) => {
  const index = food.findIndex(f => f.name === name)
  return index
}

const deleteFood = (name, food) => {
  let updatedFood = food.filter(function(f, index, arr) {
    return f.name !== name
  })

  return updatedFood
}

const addFood = (foodItem, food) => {
  food.push(foodItem)

  return food
}

export { validate, foodExist, deleteFood, addFood }
