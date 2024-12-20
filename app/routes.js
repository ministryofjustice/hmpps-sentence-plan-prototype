//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const dateFormat1 = { day: 'numeric', month: 'long', year: 'numeric' }

/**
 * This is the name of the design revision
 * Make sure this matches the root folder of your designs!
 */
var DESIGN_VERSION="splan8"

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
        req.session.data.goals = []

        req.session.data.notes = []
    }
    return next()
})

// Removed adding goals by default
// You can get no goals if you use the create plan route
// If you hit the link on the /index page for update plan
// you get the goals added if none exist


router.get('/:version/create-data', function (req, res) {

    // empty data first
    req.session.data = {};

    if(!req.session.data.goals) {
        console.log("yolo")
        req.session.data.goals = [
            {
                id: 1,
                needArea: "Finance",
                goalObjective: "I want to be in a position where I feel happier and confident in myself again so that I can be a better mother to my children",
                relatedNeedAreas: [
                    "Health and wellbeing",
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
                status: "ACTIVE",
                date: "16 November 2024",
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
            },
            {
                id: 3,
                needArea: "Thinking, behaviours and attitudes",
                goalObjective: "To better understand the link between my alcohol use and harmful behaviour when feeling stressed and overwhelmed",
                relatedNeedAreas: [],
                status: "FUTURE",
                steps: []
            },
            {
                id: 4,
                needArea: "Health and wellbeing",
                goalObjective: "I will identify opportunities to re-engage in my previous hobbies, like rugby and general fitness.",
                relatedNeedAreas: [],
                status: "REMOVED",
                statusReason: "Sam has removed this goal from her plan because she realised her immediate focus should be on managing stress and emotional well-being rather than adding new activities. " +
                    "By prioritising her mental health and reducing stress-related alcohol use, Sam is concentrating on more critical aspects of her rehabilitation.",
                statusDate: "1 August 2024",
                steps: []
            },
            {
                id: 5,
                needArea: "Finance",
                goalObjective: "I will explore options to manage my financial obligations to reduce stress and ensure stability for my family.",
                relatedNeedAreas: [],
                status: "ACHIEVED",
                statusReason: "Sam has successfully explored and implemented strategies to manage her financial obligations, including contacting the court for payment options and creating a budget. " +
                    "This has reduced her financial stress, allowing her to feel more confident in providing for her children and maintaining stability in her home",
                statusDate: "1 August 2024",
                steps: [
                    {
                        id: 1,
                        who: "Sam",
                        step: "Contacted the Court to inquire about payment plan options for my fine and court costs ",
                        stepStatus: "completed",
                    },
                    {
                        id: 2,
                        who: "Sam",
                        step: "Created a budget to track expenses and identify areas where I can save money",
                        stepStatus: "completed",
                    },
                    {
                        id: 3,
                        who: "Sam",
                        step: "Consulted with a financial advisor or support service to get advice on managing my finances more effectively",
                        stepStatus: "completed",
                    },
                ]
            }
        ]

        req.session.data.notes = [
            {
                type: 'GOAL',
                subtype: 'REMOVED',
                createdAt: new Date("1 October 2024 09:00"),
                content: {
                    goalId: 4,
                    goalTitle: "I will identify opportunities to re-engage in my previous hobbies, like rugby and general fitness.",
                    reason: "Sam has removed this goal from her plan because she realised her immediate focus should be on managing stress and emotional well-being rather than adding new activities. " +
                        "By prioritising her mental health and reducing stress-related alcohol use, Sam is concentrating on more critical aspects of her rehabilitation."
                }
            },
            {
                type: 'GOAL',
                subtype: 'ACHIEVED',
                createdAt: new Date("1 October 2024 15:00"),
                content: {
                    goalId: 5,
                    goalTitle: "I will explore options to manage my financial obligations to reduce stress and ensure stability for my family.",
                    reason: "Sam has successfully explored and implemented strategies to manage her financial obligations, including contacting the court for payment options and creating a budget. " +
                        "This has reduced her financial stress, allowing her to feel more confident in providing for her children and maintaining stability in her home",
                }
            },
            {
                type: 'PLAN',
                subtype: 'PROGRESS',
                createdAt: new Date(),
                content: {
                    overallNote: "Sam has only recently been sentenced in Court and our current focus has been on helping " +
                        "her understand the roles and responsibilities of Probation and understanding the requirements of her order. " +
                        "Sam has shown some great early intentions to comply and better understand herself and her actions, " +
                        "both of which we can continue to build up to improve her resilience to life stressors.",
                    supportRequired: 'no',
                    supportRequiredNote: '',
                    popInvolvement: 'yes',
                    popInvolvementNote: ''
                }
            },
        ]
    }

    return res.redirect(`/${req.params.version}/plan-overview.html`)
})


/**
 * Here's a super simple route that just renders the
 * views/splan6/index.html page.
 */
router.get('/:version/index', function (req, res) {
    return res.render(`${req.params.version}/index.html`)
})

/**
 * Another super simple route that just renders the
 * views/splan6/create-goal.html page.
 */
router.get('/:version/create-goal', function (req, res) {
    return res.render(`${req.params.version}/create-goal.njk`)
})

/**
 * We want to save some data from the goal page's form, so we add
 * a POST route for the data to be sent to when you submit the form.
 * Remember to make sure that your form HTML is wrapped with a
 * <form method="post">
 *     ...
 * </form>
 */
router.post('/:version/create-goal', function (req, res) {
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
        return res.redirect(`/${req.params.version}/goal/${goalData.id}/add-steps`)
    }

    return res.redirect(`/${req.params.version}/plan-overview`)
})

/**
 * Here we set up the add steps route, we're being a bit fancy here and using
 * a path variable, :goalId, to add steps to a specific goal
 */
router.get(`/:version/goal/:goalId/add-steps`, (req, res, next) => {
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
    return res.render(`/${req.params.version}/add-steps.html`, {
        GOAL_DATA: goalData
    })
})

/**
 * Add a post route for receiving the steps, which can then be added to the goal with
 * the id that matches :goalId in the URL.
 */
router.post(`/:version/goal/:goalId/add-steps`, (req, res, next) => {
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
    return res.redirect(`/${req.params.version}/plan-overview`)
})

router.get(`/:version/plan-overview`, (req, res, next) => {
    return res.render(`${req.params.version}/plan-overview.html`, {
        ACTIVE_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACTIVE'),
        FUTURE_GOALS: req.session.data.goals.filter(goal => goal.status === 'FUTURE'),
        REMOVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'REMOVED'),
        ACHIEVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACHIEVED')
    })
})

router.get(`/:version/plan-overview-removed`, (req, res, next) => {
    return res.render(`${req.params.version}/plan-overview-removed.html`, {
        ACTIVE_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACTIVE'),
        FUTURE_GOALS: req.session.data.goals.filter(goal => goal.status === 'FUTURE'),
        REMOVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'REMOVED'),
        ACHIEVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACHIEVED')
    })
})

router.get(`/:version/plan-overview-later`, (req, res, next) => {
    return res.render(`${req.params.version}/plan-overview-later.html`, {
        ACTIVE_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACTIVE'),
        FUTURE_GOALS: req.session.data.goals.filter(goal => goal.status === 'FUTURE'),
        REMOVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'REMOVED'),
        ACHIEVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACHIEVED')
    })
})

router.get(`/:version/plan-overview-achieved`, (req, res, next) => {
    return res.render(`${req.params.version}/plan-overview-achieved.html`, {
        ACTIVE_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACTIVE'),
        FUTURE_GOALS: req.session.data.goals.filter(goal => goal.status === 'FUTURE'),
        REMOVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'REMOVED'),
        ACHIEVED_GOALS: req.session.data.goals.filter(goal => goal.status === 'ACHIEVED')
    })
})

router.get(`/:version/agreed-plan`, (req, res, next) => {
    /**
     *  We can now access all goal data through {{ GOALS_DATA }} in our HTML/template
     */
    return res.render(`${req.params.version}/agreed-plan.html`, {
        GOALS_DATA: req.session.data.goals.filter(goal => goal.date),
        GOALS_FOR_LATER_DATA: req.session.data.goals.filter(goal => !goal.date)
    })
})

router.get(`/:version/agreed-plan-later`, (req, res, next) => {
    /**
     *  We can now access all goal data through {{ GOALS_DATA }} in our HTML/template
     */
    return res.render(`${req.params.version}/agreed-plan-later.html`, {
        GOALS_DATA: req.session.data.goals.filter(goal => goal.date),
        GOALS_FOR_LATER_DATA: req.session.data.goals.filter(goal => !goal.date)
    })
})

router.get(`/:version/progress`, (req, res, next) => {
    return res.render(`${req.params.version}/progress.html`, {
        NOTES: req.session.data.notes.toReversed()
    })
})

router.get(`/:version/record-progress`, (req, res, next) => {
    return res.render(`${req.params.version}/record-progress.html`)
})

router.post(`/:version/record-progress`, (req, res, next) => {
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

    return res.redirect(`/${req.params.version}/progress`)
})

router.get(`/:version/goal/:goalId/remove-goal`, (req, res, next) => {
    const goalId = req.params.goalId

    const goalData = req.session.data.goals[goalId - 1]

    return res.render(`${req.params.version}/remove-goal.html`, {
        GOAL_DATA: goalData
    })
})

router.post(`/:version/goal/:goalId/remove-goal`, (req, res, next) => {
    const goalId = Number(req.params.goalId)

    const goal = req.session.data.goals.find(goal => goal.id === goalId);
    goal.status = 'REMOVED'
    goal.statusReason = req.body['moreDetail']
    goal.statusDate = new Date().toLocaleDateString('en-GB', dateFormat1);

    const note = {
        type: 'GOAL',
        subtype: 'REMOVED',
        createdAt: new Date(),
        content: {
            goalId: goal.id,
            goalTitle: goal.goalObjective,
            reason: goal.statusReason
        }
    }

    req.session.data.notes.push(note)

    return res.redirect(`/${req.params.version}/plan-overview-removed`)
})

router.get(`/:version/goal/:goalId/update-goal`, (req, res, next) => {
    /** We can access that path variable like so */
    const goalId = Number(req.params.goalId)

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
            text: 'Cannot be done yet',
            value: 'cannot-be-done-yet',
        },
        {
            text: 'No longer required',
            value: 'no-longer-required',
        },
        {
            text: 'Completed',
            value: 'completed',
        }
        
    ]

    return res.render(`/${req.params.version}/update-goal.html`, {
        GOAL_DATA: goalData,
        STEP_STATUSES: stepStatuses,
        GOAL_NOTES: req.session.data.notes.filter(note => note.type === 'GOAL' && note.content.goalId === goalId).toReversed()
    })
})

router.post(`/:version/goal/:goalId/update-goal`, (req, res, next) => {
    const goalId = Number(req.params.goalId)

    const goal = req.session.data.goals[goalId - 1]

    const form = req.body

    // loop over steps in goalData
    // where step.id === form.step-status-[id-here}
    // update step.stepStatus to form.step-status-[id-here} value

    goal.steps.forEach(step => {
        const stepStatusFromForm = form[`step-status-${step.id}`]
        if (stepStatusFromForm) {
            step.stepStatus = stepStatusFromForm
        }
    })

    const note = {
        type: 'GOAL',
        subtype: 'UPDATED',
        createdAt: new Date(),
        content: {
            goalId: goal.id,
            goalTitle: goal.goalObjective,
            reason: form['moreDetail']
        }
    }

    req.session.data.notes.push(note)

    switch (goal.status) {
        case 'FUTURE':
            return res.redirect(`/${req.params.version}/plan-overview-later`)
        case 'REMOVED':
            return res.redirect(`/${req.params.version}/plan-overview-removed`)
        case 'ACHIEVED':
            return res.redirect(`/${req.params.version}/plan-overview-achieved`)
        default:
        case 'ACTIVE':
            return res.redirect(`/${req.params.version}/plan-overview`)
    }
})

router.get(`/:version/goal/:goalId/update-goal-details`, (req, res, next) => {
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    return res.render(`${req.params.version}/update-goal-details.html`, {
        GOAL_DATA: goalData
    })
})

router.post(`/:version/goal/:goalId/update-goal-details`, (req, res, next) => {
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    goalData.goalObjective = req.body.goalObjective
    goalData.relatedNeedAreas = Array.isArray(req.body.relatedNeedAreas) ?
        req.body.relatedNeedAreas.filter(areaOfNeed => areaOfNeed !== "_unchecked") : []
    goalData.status = req.body.isActiveGoal === 'Yes' ? 'ACTIVE' : 'FUTURE'
    goalData.date = req.body.date === 'custom' ? `by ${req.body.datePicker}` : req.body.date

    switch (goalData.status) {
        case 'FUTURE':
            return res.redirect(`/${req.params.version}/plan-overview-later`)
        case 'REMOVED':
            return res.redirect(`/${req.params.version}/plan-overview-removed`)
        case 'ACHIEVED':
            return res.redirect(`/${req.params.version}/plan-overview-achieved`)
        default:
        case 'ACTIVE':
            return res.redirect(`/${req.params.version}/plan-overview`)
    }
})

router.get(`/:version/goal/:goalId/achieve-goal`, (req, res, next) => {
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    return res.render(`${req.params.version}/goal-achieved.html`, {
        GOAL_DATA: goalData
    })
})

router.post(`/:version/goal/:goalId/achieve-goal`, (req, res, next) => {
    const goalId = Number(req.params.goalId)
    const goal = req.session.data.goals.find(goal => goal.id === goalId);
    goal.status = 'ACHIEVED'
    goal.statusReason = req.body['moreDetail']
    goal.statusDate = new Date().toLocaleDateString('en-GB', dateFormat1);

    const note = {
        type: 'GOAL',
        subtype: 'ACHIEVED',
        createdAt: new Date(),
        content: {
            goalId: goal.id,
            goalTitle: goal.goalObjective,
            reason: goal.statusReason
        }
    }

    req.session.data.notes.push(note)

    return res.redirect(`/${req.params.version}/plan-overview-achieved`)
})

router.get(`/:version/goal/:goalId/readd-goal`, (req, res, next) => {
    const goalId = req.params.goalId
    const goalData = req.session.data.goals[goalId - 1]

    return res.render(`/${req.params.version}/add-goal-to-plan.html`, {
        GOAL_DATA: goalData
    })
})

router.post(`/:version/goal/:goalId/readd-goal`, (req, res, next) => {
    const goalId = Number(req.params.goalId)
    const goal = req.session.data.goals.find(goal => goal.id === goalId);

    goal.status = req.body.isActiveGoal === 'Yes' ? 'ACTIVE' : 'FUTURE'
    goal.date = req.body.date === 'custom' ? `by ${req.body.datePicker}` : req.body.date

    switch (goal.status) {
        case 'FUTURE':
            return res.redirect(`/${req.params.version}/plan-overview-later`)
        case 'REMOVED':
            return res.redirect(`/${req.params.version}/plan-overview-removed`)
        case 'ACHIEVED':
            return res.redirect(`/${req.params.version}/plan-overview-achieved`)
        default:
        case 'ACTIVE':
            return res.redirect(`/${req.params.version}/plan-overview`)
    }
})