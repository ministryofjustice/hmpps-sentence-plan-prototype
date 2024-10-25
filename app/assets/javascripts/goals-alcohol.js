window.onload = function() {
    const goal = [
      "I will work towards being alcohol-free, so that [add why]",
      "I will continue to [add activity or behaviour] to help me stay alcohol free",
      "I will reduce the number of days I drink alcohol each week [from number of days to number of days]",
      "I will improve my knowledge about safe driving and the effects of alcohol on driving ",
      "I will improve my understanding of how drinking alcohol affects my body and behaviour"
      
      
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