window.onload = function() {
    const goal = [
      "I will reduce my current debt [from a number to a number]",
      "I will find new ways to budget my money and keep to my income",
      "I will find a job, so that [add why]",
      "I will complete [add course or qualification]"
      
      
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