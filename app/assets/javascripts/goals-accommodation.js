window.onload = function() {
    const goal = [
        "I will find accommodation that is suitable, safe and stable",
        'I will maintain my current accommodation'
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