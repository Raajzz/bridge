const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// validator is used to validate whether the given "something" (example, email) follows the standards.

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter Your Name"],
		maxLength: [30, "Name cannot exceed 30 characters"],
		minLength: [4, "Name should have more than 4 characters"],
	},
	email: {
		type: String,
		required: [true, "Please Enter Your Email"],
		unique: true,
		validate: [validator.isEmail, "Please Enter A Valid Email"],
	},
	password: {
		type: String,
		required: [true, "Please Enter Your Password"],
		minLength: [8, "Password should have more than 8 characters"],
		select: false,
	},
	avatar: {
		// array of objects, because there can be multiple
		// images for one product
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
	// runs when a password is not modified rather some other user
	// field is modified

	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
	// 10 characters for password
});

// JWT TOKEN

userSchema.methods.getJWTToken = function () {
	return jwt.sign(
		{
			id: this._id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRE,
		}
	);
};

// compare password

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
