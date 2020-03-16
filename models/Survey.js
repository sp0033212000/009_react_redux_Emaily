const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipientSchema = require("./Recipient");

const surveySchema = new Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	subject: { type: String, required: true },
	recipients: { type: [recipientSchema], required: true },
	_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	dateSent: Date,
	lastResponded: Date
});

mongoose.model("surveys", surveySchema);
