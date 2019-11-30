export function validate(food) {
  if (!food.name) {
    return { valid: false, message: 'Name is missing' }
  }

  if (food.protein === null || food.protein === '' || food.protein === NaN) {
    return { valid: false, message: 'Protein is missing' }
  }

  if (food.carbs === null || food.carbs === '' || food.carbs === NaN) {
    return { valid: false, message: 'Carbs is missing' }
  }

  if (food.fat === null || food.fat === '' || food.fat === NaN) {
    return { valid: false, message: 'Fat is missing' }
  }

  return { valid: true, message: '' }
}
