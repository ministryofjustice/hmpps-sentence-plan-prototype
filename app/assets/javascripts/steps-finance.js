window.onload = function() {
    const lasteps = [
      "Attend an appointment with the Citizen's Advice Bureau",
      "Attend Budgetary Financial Management course",
      "Attend Finance Advocacy course",
      "Check with Citizen's Advice Bureau that an appointment was attended",
      "Check with court that fines have been paid",
      "Citizen's Advice Bureau to complete an assessment and give advice and information",
      "Create a budget",
      "Pay money back ",
      "Pay off fines",
      "Repay money borrowed from friends or family",
      "Saved money so appointments can be attended",
      "Share evidence of how debts have been paid off",
      "Share examples of how money is being managed"
      ]
    
      accessibleAutocomplete({
        element: document.querySelector('#step0'),
        id: 'step0', // To match it to the existing <label>.
        name: 'step0',
        source: lasteps,
        displayMenu: 'overlay'
      })
  };