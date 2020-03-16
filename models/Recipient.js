const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
	email: { type: String, required: true },
	responded: {
		type: Boolean,
		default: false
	},
	choice: {
		type: String,
		default: null
	}
});

module.exports = recipientSchema;
