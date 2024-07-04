window.onload = function() {
    const goal = [
      "I will find positive ways to earn money",
      "I will improve my budgeting skills",
      "I will improve my understanding of how my finances affect my behaviour",
      "I will manage my money, so it lasts until my next pay",
      "I will not borrow money from friends or family",
      "I will pay my fines",
      "I will reduce how much money I owe"
      ]
    
      accessibleAutocomplete({
        element: document.querySelector('#goalObjective'),
        id: 'goalObjective', // To match it to the existing <label>.
        name: 'goalObjective',
        source: goal,
        displayMenu: 'overlay'
      })
  };