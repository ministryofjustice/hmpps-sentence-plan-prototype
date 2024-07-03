//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/**
 * This is the name of the design revision
 * Make sure this matches the root folder of your designs!
 */
const DESIGN_VERSION="splan6"

/**
 * Here we add routes to the application,
 * GET routes are pages that appear when you click a link, refresh the browser,
 * navigate to a page etc. You'll see these written like `router.get(`/my-page`)
 *
 * POST routes are where we handle the data from a form submission.
 * We usually want these to have the same page URL as the page the form exists on.
 * This means one URL might have both a GET (for loading the page) and a POST
 * for getting the submitted form data from a page!
 */

/**
 * Here's a super simple route that just renders the
 * views/splan6/index.html page.
 */
router.get(`/${DESIGN_VERSION}/index`, function (req, res) {
    res.render(`${DESIGN_VERSION}/index.html`)
})


/**
 * Another super simple route that just renders the
 * views/splan6/create-goal.html page.
 */
router.get(`/${DESIGN_VERSION}/create-goal`, function (req, res) {
    res.render(`${DESIGN_VERSION}/create-goal.njk`)
})

/**
 * We want to save some data from the goal page's form, so we add
 * a POST route for the data to be sent to when you submit the form.
 * Remember to make sure that your form HTML is wrapped with a
 * <form method="post">
 *     ...
 * </form>
 */
router.post(`/${DESIGN_VERSION}/create-goal`, function (req, res) {
    /**
     * Here we save all the data from the create-goal form
     * When data is POST'd from your web-browser, it's stored in the request (req) body.
     * We can then store this data in our browser session, using req.session
     *
     * I've chosen to save it as 'createGoalForm' as that should make it
     * easy to reference in future
     */
    req.session.data.createGoalForm = req.body

    /**
     * As of writing this comment, the req.body (for my chosen options) looks like
     *
     * {
     *     needArea: "Accommodation"
     *     goalObjective: "I will find suitable accommodation that's safe and secure"
     *     hasRelatedNeed: "Yes"
     *     relatedNeedAreas:  ["Drug use", "Health and wellbeing"]
     *     isActiveGoal: "Yes"
     *     date: "At our next meeting (8 August 2024)"
     * }
     *
     * These match up with the "name" attribute that you see on the inputs within the form
     * and the values correspond to the selected option.
     * We can now access these values in one of these routers in future by writing
     * req.session.data.createGoalForm['needArea']
     *
     * Or we can access it in your HTML using
     * {{ data.createGoalForm['needArea'] }}
     */

    /**
     * Once we've saved this data into our session, we're going to redirect the user's
     * browser to the add steps page
     */
    res.redirect(`/${DESIGN_VERSION}/add-steps`)
})