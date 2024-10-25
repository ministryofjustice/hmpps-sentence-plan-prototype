window.onload = function() {
    const goal = [
      "I will manage my emotions better by [add how], so that I can improve my overall wellbeing ",
      "I will set aside [add minutes or hours] each week for exercise to help reduce stress and improve my overall wellbeing",
      "I will improve my mental health, so that [add why]",
      "I will improve my physical health, so that [add why]",
      "I will prioritise my wellbeing, so that [add why]",
      "I will improve how I recognise what emotions I am feeling, so that I can understand my behaviour better",
      "I will get support from [add partner agency or organisation] to help me understand my past experiences and how I can manage my emotions in a safer way"
      
      
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