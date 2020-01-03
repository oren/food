const countCalories = food => {
  function sumProtein(total, f) {
    return total + f.protein * f.count
  }

  function sumCarb(total, f) {
    return total + f.carbs * f.count
  }

  function sumFat(total, f) {
    return total + f.fat * f.count
  }

  const protein = food.reduce(sumProtein, 0)
  const carbs = food.reduce(sumCarb, 0)
  const fat = food.reduce(sumFat, 0)

  return { protein, carbs, fat }
}

export { countCalories }
