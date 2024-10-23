window.onload = function() {
    const goal = [
      "I will increase the number of days I am drug-free each week [from number of days to number of days]",
      "I will continue to [add activity or behaviour] to help me stay drug free",
      "I will improve my understanding of why I use drugs when [add reasons for drug use]",
      "I will reduce my methadone script, so that [add why]",
      "I will reduce my Subutex script, so that [add why] ",
      "I will improve my knowledge about safe driving and how drugs affect my body while driving"
      
      
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