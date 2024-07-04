window.onload = function() {
    const lasteps = [
      "Attend all probation appointments",
      "Attend and engage with exercises during supervision sessions",
      "Attend counselling",
      "Attend rehabilitation activity requirement (RAR) meetings on time",
      "Attend Motivational Work Counselling",
      "Attend Pro Social Modelling course",
      "Attend Racially Motivated Offending course",
      "Attend Thinking Skills Violence course",
      "Break each problem into smaller parts, instead of trying to deal with it all at once",
      "Consider previous problems they dealt with and what they could have done differently",
      "Discuss how thoughts or beliefs may impacts behaviour",
      "Find alternative solutions to problems",
      "Find non-violent solutions to problems",
      "Find positive solutions to problems",
      "Identify people who can help with problems",
      "Improve ability to identify a problem",
      "Improve understanding of the results of their behaviour",
      "Increase awareness of how impulsiveness can affect behaviour",
      "Learn and understand how they have used anti-social or discriminatory attitudes to justify their behaviour",
      "Share evidence of problems you have approached in a practical way",
      "Share examples of how others see their attitudes and behaviour",
      "Share examples of how their thoughts and feelings affect behaviour",
      "Share examples of problems solved",
      "Think about what has contributed to previous behaviour",
      "Update on progress made and provide examples of achievements"
      ]
    
      accessibleAutocomplete({
        element: document.querySelector('#step0'),
        id: 'step0', // To match it to the existing <label>.
        name: 'step0',
        source: lasteps,
        displayMenu: 'overlay',
        minLength: 3,
        showNoOptionsFound: false
      })
  };