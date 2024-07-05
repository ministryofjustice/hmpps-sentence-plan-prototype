window.onload = function() {
    const lasteps = [
        "Comply with the rules and regulation of the Approved Premises/Supported Housing where I currently live",
        "Improve my relationships with my neighbours and/or others in my accommodation",
        "Reduce any rent arrears",
        "Attend appointments with my housing worker",
        "Pay rent/mortgage and bills are paid on time",
        "Comply with any safeguarding conditions or restrictions that relate to my accommodation",
        "Find information and advice about available accommodation",
        "Submit an application to housing provider(s)",
        "Attend housing appointments to have my housing needs assessed",
        "Reduce any rent arrears",
        "Seek approval before accepting accommodation offer, where required"
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