window.onload = function() {
    const goal = [
        "I will maintain my current accommodation by [add how]",
        'I will find accommodation that is more suitable for me because [add why] ',
        "I will reduce how much rent I owe ('arrears'), so that [add why] "
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