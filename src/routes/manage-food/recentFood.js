function addFoodToRecent(food, recentFood) {
  // add to array
  // remove last element if length > 20
  recentFood.unshift(food)

  if (recentFood.length > 20) {
    recentFood.pop()
  }

  localStorage.setItem('recentFood', JSON.stringify(recentFood))
}

export { addFoodToRecent }
