window.onload = function() {
    const goal = [
        "I will find a safe and stable place to live",
        'I will keep my current accommodation'
      ]
    
      accessibleAutocomplete({
        element: document.querySelector('#goalObjective'),
        id: 'goalObjective', // To match it to the existing <label>.
        name: 'goalObjective',
        source: goal,
        displayMenu: 'overlay'
      })
  };