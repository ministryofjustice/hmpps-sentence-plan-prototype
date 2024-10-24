window.onload = function() {
    const goal = [
      "I will reduce my current debt [from a number to a number]",
      "I will find new ways to budget my money and keep to my income",
      "I will reduce my [court fines, debts or bills] by [add amount], so that I can improve my finances ",
      "I will identify new ways that can help me reduce my gambling",
      "I will continue to reduce my gambling by [add behaviour or activity] "
      
      ]
    
      accessibleAutocomplete({
        element: document.querySelector('#goalObjective'),
        id: 'goalObjective', // To match it to the existing <label>.
        name: 'goalObjective',
        source: goal,
        displayMenu: 'overlay',
        minLength: 3,
        showNoOptionsFound: false
      })
  };