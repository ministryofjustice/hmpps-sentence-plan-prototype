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
const DESIGN_VERSION="splan7"

/**
 * Here we add routes to the application,
 * GET routes are pages that appear when you click a link, refresh the browser,
 * navigate to a page etc. You'll see these written like `router.get(`/my-page`)
 *
 * POST routes are where we handle the data from a form submission.
 * We usually want these to have the same page URL as the page the form exists on.
 * This means one URL might have both a GET (for loading the page) and a POST
 * for getting the submitted form data from a page!
 * You'll see these written like `router.post(`/my-page`)
 */



/**
 * `router.use` functions run before every request to the service.
 * It's a great spot for setting up spaces to store data.
 * Let's set up a place to store our goal objects
 */
router.use((req, res, next) => {
    /**
     * Let's make sure we haven't already set up our goals array.
     * If we overwrite it, we'll lose all the goals we've added this session!
     * So, if the goals array isn't ready yet, let's get it set up to start saving goals!
     */
    if(!req.session.data.goals) {
        req.session.data.goals = [
            {
                id: 1,
                needArea: "Finance",
                goalObjective: "I want to be in a position where I feel happier and confident in myself again so that I can be a better mother to my children",
                relatedNeedAreas: [
                    "Health and wellbeing"
                ],
                status: "ACTIVE",
                date: "16 February 2025",
                steps: [
                    {
                        id: 1,
                        who: "Sam",
                        step: "I will contact my GP for an appointment to discuss experiences of low mood and discuss what support I can be offered",
                        stepStatus: "completed",
                    },
                    {
                        id: 2,
                        who: "Sam",
                        step: "I will contact the Court to ask for more information on payment plan options to reduce the worry I have from my fine and Court costs",
                        stepStatus: 'completed',
                    },
                    {
                        id: 3,
                        who: "Probation practitioner",
                        step: "I will support and signpost Sam as needed to ensure that she is able to get her fines and Court costs in a more manageable place",
                        stepStatus: "in-progress",
                    }
                ]
            },
            {
                id: 2,
                needArea: "Thinking, behaviours and attitudes",
                goalObjective: "I will identify 4 different strategies to help me manage my stress better in order to stop me from binge drinking",
                relatedNeedAreas: [
                    "Alcohol use",
                    "Health and wellbeing"
                ],
                status: "FUTURE",
                statusReason: 'John was super skilled and flew the helicopter well!',
                steps: [
                    {
                        id: 1,
                        who: "Sam",
                        step: "Identify factors that contribute to causing me to feel stressed",
                        stepStatus: "in-progress",
                    },
                    {
                        id: 2,
                        who: "Probation practitioner",
                        step: "Identify factors that contribute to causing Sam to feel stressed",
                        stepStatus: "in-progress",
                    },
                    {
                        id: 3,
                        who: "Sam",
                        step: "Complete a brief intervention on the impact of binge drinking and its consequences on myself",
                        stepStatus: "not-started",
                    },
                    {
                        id: 4,
                        who: "Probation practitioner",
                        step: "Complete a brief intervention on the impact of binge drinking and its consequences on Sam",
                        stepStatus: "not-started",
                    }
                ]
            }
        ]

        req.session.data.notes = [{
            type: 'PLAN',
            subtype: 'PROGRESS',
            createdAt: new Date(),
            content: {
                overallNote: "John is making really great progress flying his helicopter around in circles",
                supportRequired: 'no',
                supportRequiredNote: `John doesn't need any support, plus I don't know how to fly a helicopter`,
                popInvolvement: 'no',
                popInvolvementNote: `John was busy piloting his helicopter `
            }
        }]
    }
    return next()
})



/**
 * Here's a super simple route that just renders the
 * views/splan6/index.html page.
 */
router.get(`/${DESIGN_VERSION}/index`, function (req, res) {
    return res.render(`${DESIGN_VERSION}/index.html`)
})

/**
 * Another super simple route that just renders the
 * views/splan6/create-goal.html page.
 */
router.get(`/${DESIGN_VERSION}/create-goal`, function (req, res) {
    return res.render(`${DESIGN_VERSION}/create-goal.njk`)
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
     *
     * As of writing this comment, the req.body (for my chosen options) looks like
     *
     * {
     *     needArea: "Accommodation"
     *     goalObjective: "I will find suitable accommodation that's safe and secure"
     *     hasRelatedNeed: "Yes"
     *     relatedNeedAreas:  ["Drug use", "Health and wellbeing", "_unchecked"]
     *     isActiveGoal: "Yes"
     *     date: "At our next meeting (8 August 2024)"
     *     action: "add-steps"
     * }
     *
     * These match up with the "name" attribute that you see on the inputs within the form
     * and the values correspond to the selected option. We'll create a variable called
     * goalData to make some changes to this
     */

    const goalData = {
        /** Let's set up an ID for this goal, so we can associate steps with it */
        id: req.session.data.goals.length + 1,

        needArea: req.body.needArea,
        goalObjective: req.body.goalObjective,

        /** 'relatedNeedAreas' has junk data in it, We will filter out the "_unchecked" value */
        relatedNeedAreas: Array.isArray(req.body.relatedNeedAreas) ?
            req.body.relatedNeedAreas.filter(areaOfNeed => areaOfNeed !== "_unchecked") : [],

        status: req.body.isActiveGoal === 'Yes' ? 'ACTIVE' : 'FUTURE',

        /** Check if the date is set to custom, if so, get value from datePicker, otherwise use req.body.date */
        date: req.body.date === 'custom' ? `by ${req.body.datePicker}` : req.body.date,

        /** We'll also add a blank array for storing steps for this goal in */
        steps: []
    }

    /**
     * Our goal data now looks like this, nice and neat for us to save and use later on!
     * {
     *     id: 1
     *     needArea: "Accommodation"
     *     goalObjective: "I will find suitable accommodation that's safe and secure"
     *     relatedNeedAreas:  ["Drug use", "Health and wellbeing"]
     *     isActiveGoal: "Yes"
     *     date: "At our next meeting (8 August 2024)"
     * }
     *
     * We're going to save it in the goals array we made earlier
     */
    req.session.data.goals.push(goalData)

    /**
     * We can now access these values in one of these routers in future by writing
     * req.session.data.goals[goal-id]
     *
     * Or we can access it in your HTML using
     * {{ data.goals[goal-id] }}
     */

    /**
     * Once we've saved this data into our session, we decide where to redirect the user
     * If they selected 'Add steps', redirect them to the add steps page
     * If they didn't select 'Add steps', redirect them to the plan overview page
     */
    if(req.body.action === 'add-steps') {
        return res.redirect(`/${DESIGN_VERSION}/goal/${goalData.id}/add-steps`)
    }

    return res.redirect(`/${DESIGN_VERSION}/plan-overview`)
})

/**
 * Here we set up the add steps route, we're being a bit fancy here and using
 * a path variable, :goalId, to add steps to a specific goal
 */
router.get(`/${DESIGN_VERSION}/goal/:goalId/add-steps`, (req, res, next) => {
    /** We can access that path variable like so */
    const goalId = req.params.goalId

    /**
     * We can then get the goal we just created from our goal data store
     * Note: We remove -1 from the goalId as arrays in Javascript are 0 indexed (start at 0)
     */
    const goalData = req.session.data.goals[goalId - 1]

    /**
     * Finally we pass that goal data to the view, so that we can use it in our page!
     * We can now access all of our relevant goal data through {{ GOAL_DATA }} in our HTML/template
     */
    return res.render(`${DESIGN_VERSION}/add-steps.html`, {
        GOAL_DATA: goalData
    })
})

/**
 * Add a post route for receiving the steps, which can then be added to the goal with
 * the id that matches :goalId in the URL.
 */
router.post(`/${DESIGN_VERSION}/goal/:goalId/add-steps`, (req, res, next) => {
    /** We access that path variable and goal again */
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    /**
     * When we add steps, the req.body looks like
     * {
     *     who0: "Joan",
     *     step0: "Will fly a helicopter"
     *     when0: "03/07/2024"'
     * }
     * with each additional step adding an extra 3 fields, and incrementing their
     * appended number. We want to break these easier to use for our other pages, so we
     * clean them up
     */
    const steps = Object.keys(req.body)
        .filter(key => key.startsWith('who'))
        .map((key, index) => ({
            id: index + 1,
            who: req.body[`who${index}`],
            step: req.body[`step${index}`],
            when: req.body[`when${index}`]
        }));
    /**
     * Now our step data is shaped like
     * [
     *     {
     *         id: 1,
     *         who: "Joan",
     *         step: "Flying a helicopter",
     *         when: "03/07/2024"
     *     },
     *         {
     *         id: 2,
     *         who: "Joan",
     *         step: "Winning the euros",
     *         when: "14/07/2024"
     *     }
     * ]
     *
     * And we can easily add all those steps into our goal's steps array,
     * and then re-save the goal.
     */
    goalData.steps.push(...steps)
    req.session.data.goals[goalId - 1] = goalData

    /** Now lets redirect the user to the summary page */
    return res.redirect(`/${DESIGN_VERSION}/plan-overview`)
})

router.get(`/${DESIGN_VERSION}/plan-overview`, (req, res, next) => {
    return res.render(`${DESIGN_VERSION}/plan-overview.html`, {
        ACTIVE_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACTIVE'),
        FUTURE_GOALS: req.session.data.goals.filter(goal => goal.status === 'FUTURE'),
        REMOVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'REMOVED'),
        ACHIEVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACHIEVED')
    })
})

router.get(`/${DESIGN_VERSION}/plan-overview-removed`, (req, res, next) => {
    return res.render(`${DESIGN_VERSION}/plan-overview-removed.html`, {
        ACTIVE_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACTIVE'),
        FUTURE_GOALS: req.session.data.goals.filter(goal => goal.status === 'FUTURE'),
        REMOVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'REMOVED'),
        ACHIEVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACHIEVED')
    })
})

router.get(`/${DESIGN_VERSION}/plan-overview-later`, (req, res, next) => {
    return res.render(`${DESIGN_VERSION}/plan-overview-later.html`, {
        ACTIVE_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACTIVE'),
        FUTURE_GOALS: req.session.data.goals.filter(goal => goal.status === 'FUTURE'),
        REMOVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'REMOVED'),
        ACHIEVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACHIEVED')
    })
})

router.get(`/${DESIGN_VERSION}/plan-overview-achieved`, (req, res, next) => {
    return res.render(`${DESIGN_VERSION}/plan-overview-achieved.html`, {
        ACTIVE_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACTIVE'),
        FUTURE_GOALS: req.session.data.goals.filter(goal => goal.status === 'FUTURE'),
        REMOVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'REMOVED'),
        ACHIEVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACHIEVED')
    })
})

router.get(`/${DESIGN_VERSION}/agreed-plan`, (req, res, next) => {
    /**
     *  We can now access all goal data through {{ GOALS_DATA }} in our HTML/template
     */
    return res.render(`${DESIGN_VERSION}/agreed-plan.html`, {
        GOALS_DATA: req.session.data.goals.filter(goal => goal.date),
        GOALS_FOR_LATER_DATA: req.session.data.goals.filter(goal => !goal.date)
    })
})

router.get(`/${DESIGN_VERSION}/agreed-plan-later`, (req, res, next) => {
    /**
     *  We can now access all goal data through {{ GOALS_DATA }} in our HTML/template
     */
    return res.render(`${DESIGN_VERSION}/agreed-plan-later.html`, {
        GOALS_DATA: req.session.data.goals.filter(goal => goal.date),
        GOALS_FOR_LATER_DATA: req.session.data.goals.filter(goal => !goal.date)
    })
})

router.get(`/${DESIGN_VERSION}/progress`, (req, res, next) => {
    return res.render(`${DESIGN_VERSION}/progress.html`, {
        PLAN_NOTES: req.session.data.notes.filter(note => note.type === 'PLAN').reverse()
    })
})

router.get(`/${DESIGN_VERSION}/record-progress`, (req, res, next) => {
    return res.render(`${DESIGN_VERSION}/record-progress.html`)
})

router.post(`/${DESIGN_VERSION}/record-progress`, (req, res, next) => {
    const { overallNote, supportRequired, supportRequiredNote, popInvolvement, popInvolvementNote } = req.body

    const note = {
        type: 'PLAN',
        subtype: 'PROGRESS',
        createdAt: Date.now(),
        content: {
            overallNote,
            supportRequired,
            supportRequiredNote: supportRequiredNote.find(el => el !== ''),
            popInvolvement,
            popInvolvementNote: popInvolvementNote.find(el => el !== ''),
        }
    }

    req.session.data.notes.push(note)

    return res.redirect(`/${DESIGN_VERSION}/progress`)
})

router.get(`/${DESIGN_VERSION}/goal/:goalId/remove-goal`, (req, res, next) => {
    /** We can access that path variable like so */
    const goalId = req.params.goalId

    /**
     * We can then get the goal we just created from our goal data store
     * Note: We remove -1 from the goalId as arrays in Javascript are 0 indexed (start at 0)
     */
    const goalData = req.session.data.goals[goalId - 1]

    /**
     * Finally we pass that goal data to the view, so that we can use it in our page!
     * We can now access all of our relevant goal data through {{ GOAL_DATA }} in our HTML/template
     */
    return res.render(`${DESIGN_VERSION}/remove-goal.html`, {
        GOAL_DATA: goalData
    })
})

router.post(`/${DESIGN_VERSION}/goal/:goalId/remove-goal`, (req, res, next) => {
    const goalId = Number(req.params.goalId)

    const goal = req.session.data.goals.find(goal => goal.id === goalId);
    goal.status = 'REMOVED'
    goal.statusReason = req.body['moreDetail']

    return res.redirect(`/${DESIGN_VERSION}/plan-overview`)
})

router.get(`/${DESIGN_VERSION}/goal/:goalId/update-goal`, (req, res, next) => {
    /** We can access that path variable like so */
    const goalId = req.params.goalId

    const goalData = req.session.data.goals[goalId - 1]

    const stepStatuses = [
        {
            text: 'Not started',
            value: 'not-started',
        },
        {
            text: 'In progress',
            value: 'in-progress',
        },
        {
            text: 'Completed',
            value: 'completed',
        },
        {
            text: 'Cannot be done yet',
            value: 'cannot-be-done-yet',
        },
    ]

    return res.render(`/${DESIGN_VERSION}/update-goal.html`, {
        GOAL_DATA: goalData,
        STEP_STATUSES: stepStatuses
    })
})

router.post(`/${DESIGN_VERSION}/goal/:goalId/update-goal`, (req, res, next) => {
    const goalId = req.params.goalId

    const goalData = req.session.data.goals[goalId - 1]

    const form = req.body

    // loop over steps in goalData
    // where step.id === form.step-status-[id-here}
    // update step.stepStatus to form.step-status-[id-here} value

    goalData.steps.forEach(step => {
        const stepStatusFromForm = form[`step-status-${step.id}`]
        if (stepStatusFromForm) {
            step.stepStatus = stepStatusFromForm
        }
    })


    res.redirect(`/${DESIGN_VERSION}/plan-overview`)
})

router.get(`/${DESIGN_VERSION}/goal/:goalId/update-goal-details`, (req, res, next) => {
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    return res.render(`${DESIGN_VERSION}/update-goal-details.html`, {
        GOAL_DATA: goalData
    })
})

router.post(`/${DESIGN_VERSION}/goal/:goalId/update-goal-details`, (req, res, next) => {
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    goalData.goalObjective = req.body.goalObjective
    goalData.relatedNeedAreas = Array.isArray(req.body.relatedNeedAreas) ?
        req.body.relatedNeedAreas.filter(areaOfNeed => areaOfNeed !== "_unchecked") : []
    goalData.status = req.body.isActiveGoal === 'Yes' ? 'ACTIVE' : 'FUTURE'
    goalData.date = req.body.date === 'custom' ? `by ${req.body.datePicker}` : req.body.date

    return res.redirect(`/${DESIGN_VERSION}/plan-overview`)
})

router.get(`/${DESIGN_VERSION}/goal/:goalId/achieve-goal`, (req, res, next) => {
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    return res.render(`${DESIGN_VERSION}/goal-achieved.html`, {
        GOAL_DATA: goalData
    })
})

router.post(`/${DESIGN_VERSION}/goal/:goalId/achieve-goal`, (req, res, next) => {
    const goalId = Number(req.params.goalId)
    const goal = req.session.data.goals.find(goal => goal.id === goalId);
    goal.status = 'ACHIEVED'
    goal.statusReason = req.body['moreDetail']

    return res.redirect(`/${DESIGN_VERSION}/plan-overview`)
})

router.get(`/${DESIGN_VERSION}/goal/:goalId/readd-goal`, (req, res, next) => {
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    return res.render(`/${DESIGN_VERSION}/add-goal-to-plan.html`, {
        GOAL_DATA: goalData
    })
})

router.post(`/${DESIGN_VERSION}/goal/:goalId/readd-goal`, (req, res, next) => {
    const goalId = Number(req.params.goalId)
    const goal = req.session.data.goals.find(goal => goal.id === goalId);

    goal.status = req.body.isActiveGoal === 'Yes' ? 'ACTIVE' : 'FUTURE'
    goal.date = req.body.date === 'custom' ? `by ${req.body.datePicker}` : req.body.date

    return res.redirect(`/${DESIGN_VERSION}/plan-overview`)
})