window.onload = function() {
    const goal = [
      "I will deal with conflict in a non-violent way",
      "I will develop new thinking and decision-making skills",
      "I will find positive ways to deal with conflict",
      "I will find positive ways to deal with difficult situations",
      "I will find positive ways to deal with others",
      "I will follow my licence conditions for the length of my sentence",
      "I will identify and overcome problems that have previously contributed to my behaviour",
      "I will improve how I deal with the supervision process",
      "I will improve how I deal with situations in a non-violent way",
      "I will improve how I plan for the future",
      "I will improve my problem-solving skills",
      "I will improve my sensitivity",
      "I will increase acceptance of cultural diversity",
      "I will increase awareness of how my attitude can affect my behaviour",
      "I will increase my assertiveness skills",
      "I will increase my self-control",
      "I will increase my understanding of how my behaviour affects others",
      "I will increase my understanding of how it feels to be treated in a discriminatory way",
      "I will try to be more practical in how I approach problems"
      ]
    
      accessibleAutocomplete({
        element: document.querySelector('#goalObjective'),
        id: 'goalObjective', // To match it to the existing <label>.
        name: 'goalObjective',
        source: goal,
        displayMenu: 'overlay'
      })
  };