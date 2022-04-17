const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../util/jwtToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "this is a sample id",
			url: "profilePicUrl",
		},
	});

	const token = user.getJWTToken();

	sendToken(user, 200, res);
});

// login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	// checking if both email and passwords were provided

	if (!email) {
		return next(new ErrorHandler("Please Enter Email", 400));
	}
	if (!password) {
		return next(new ErrorHandler("Please Enter Password", 400));
	}

	const user = await User.findOne({
		email,
	}).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid email or password"), 401);
	}

	const isPasswordMatched = user.comparePassword();

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid email or password"), 401);
	}

	const token = user.getJWTToken();

	sendToken(user, 200, res);
});