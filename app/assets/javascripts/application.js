//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  new MOJFrontend.FilterToggleButton({
    bigModeMediaQuery: "(min-width: 48.063em)",
    startHidden: true,
    toggleButton: {
      container: $(".moj-action-bar__filter"),
      showText: "Show filter",
      hideText: "Hide filter",
      classes: "govuk-button--secondary",
    },
    closeButton: {
      container: $(".moj-filter__header-action"),
      text: "Close",
    },
    filter: {
      container: $(".moj-filter"),
    },
  });

})


