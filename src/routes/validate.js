export function validate(food) {
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
