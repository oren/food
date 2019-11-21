export function validate(food) {
  if (!food.name) {
    return { valid: false, message: 'Name is missing' }
  }

  if (!food.protein) {
    return { valid: false, message: 'Protein is missing' }
  }

  if (!food.carbs) {
    return { valid: false, message: 'Carbs is missing' }
  }

  if (!food.fat) {
    return { valid: false, message: 'Fat is missing' }
  }

  return { valid: true, message: '' }
}
