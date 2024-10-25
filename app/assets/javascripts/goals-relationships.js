window.onload = function() {
    const goal = [
      "I will continue to engage with Children's Services as part of my Children in Need (CIN) plan, so that I can have a better relationship with my children ",
      "I will continue to engage with Children's Services as part of my Child Protection (CP) plan, so that I can have a better relationship with my children",
      "I will better understand my [partner's, family's, children's, or friends'] needs to help me communicate with them better in a healthy way",
      "I will be a more helpful and supportive [neighbour, partner, mother, father, or friend]",
      "I will identify areas of my behaviour I need to improve, so that I have a healthier relationship with my [partner, family, friends or children]",
      "I will gain skills and experience through my [add unpaid work project]",
      "I will [repay or help] my local community through my [add unpaid work project]",
      "I will improve my parenting skills, so that I can work towards [regaining contact with or getting access to] my children"
      
      
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