window.onload = function() {
    const goal = [
      "I will understand my own values to give me a better sense of purpose and motivation to achieve my goals",
      "I will learn more about what I enjoy and find things I can spend quality time doing, so that [add why]",
      "I will attend and participate in [add accredited programme, structure intervention or toolkit], so that [add why]",
      "I will better understand the impact of my actions when I [add behaviour] and how this makes [others, my family, my partner, or my friends] feel ",
      "I will identify people I can talk to when I have a problem, so they can help me deal with it in a positive way",
      "I will follow my [add licence conditions, curfew or exclusion zone]"
      
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