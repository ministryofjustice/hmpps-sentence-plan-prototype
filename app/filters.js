const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('prettyPrintDate', (date) => {
    return new Date(date)
        .toLocaleString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        .replace(',', ' at');
})