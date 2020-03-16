const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
	app.get("/api/surveys", requireLogin, async (req, res) => {
		const userId = req.user;
		const surveys = await Survey.find({ _user: userId }).select({
			recipients: false
		});

		return res.send(surveys);
	});

	app.get("/api/surveys/:surveyId/:choice", (req, res) => {
		return res.send("Thanks for voting!");
	});

	app.post("/api/surveys/webhooks", (req, res) => {
		const p = new Path("/api/surveys/:surveyId/:choice");

		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					if (match.surveyId && match.choice) {
						return {
							email,
							surveyId: match.surveyId,
							choice: match.choice
						};
					}
				}
			})
			.compact()
			.uniqBy("email", "surveyId")
			.each(({ email, surveyId, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: {
							"recipients.$.responded": true,
							"recipients.$.choice": choice
						},
						lastResponded: new Date()
					}
				).exec();
			})
			.value();

		return res.send({});
	});

	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const recipient_data = recipients
			.split(",")
			.map((email) => ({ email: email.trim() }));

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipient_data,
			_user: req.user.id,
			dateSent: Date.now()
		});

		//Sending Email
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.sned();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			return res.send(user);
		} catch (error) {
			return res.status(422).send(error);
		}
	});
};
