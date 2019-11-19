export function validate(food) {
  if (!food.name) {
    return { valid: false, message: 'Name is missing' }
  }

  if (food.protein === '' || food.protein === null) {
    return { valid: false, message: 'Protein is missing' }
  }

  if (food.carbs === '' || food.carbs === null) {
    return { valid: false, message: 'Carbs is missing' }
  }

  if (food.fat === '' || food.fat === null) {
    return { valid: false, message: 'Fat is missing' }
  }

  return { valid: true, message: '' }
}
