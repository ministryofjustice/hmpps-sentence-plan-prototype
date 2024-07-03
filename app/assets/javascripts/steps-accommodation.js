window.onload = function() {
    const lasteps = [
        'Put',
        'Steps',
        'Here',
        'When',
        'Ready',
        'Attend an appointment with a housing agency'
      ]
    
      accessibleAutocomplete({
        element: document.querySelector('#step0'),
        id: 'step0', // To match it to the existing <label>.
        name: 'step0',
        source: lasteps,
        displayMenu: 'overlay'
      })
  };