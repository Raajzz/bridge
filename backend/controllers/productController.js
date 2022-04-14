const Product = require("../models/productModel");
const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// admin + merchant

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.create(req.body);
	// this req.body is the body of the post request, which'll be added to the database,
	// that is the reason why use async because we don't wanna get delayed
	res.status(201).json({
		// 201 means a resource has been created successfully
		success: true,
		product,
	});
});

// getting all the products in the collection

// async because we want to perform actions in an order

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
	const products = await Product.find();

	if (!products) {
		return next(new ErrorHandler("Products Not Found", 404));
	}

	res.status(200).json({
		// 201 means a resource has been created successfully
		success: true,
		products,
	});
});

// a put request to update the product

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product Not Found", 404));
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		product,
	});
});

// delete the product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product Not Found", 404));
	}

	await product.remove(); // just to remove a product

	res.status(200).json({
		success: true,
		message: "Product Deleted Successfully",
	});
});

// Get single product details

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		// Instead of using an object to hold the state of something over a request, we can use res.locals too, which
		return next(new ErrorHandler("Product Not Found", 404));
		/* 
		
		Look at the way in which app.js is setup, first there's router middle ware and then there's the error middleware.
		
		The router middleware will trigger router.<something> which'll then trigger some of the function here, if it triggers
		getSingleProduct function AND if there's a error the 'next' function will be triggered which will then for the next
		middleware which is the error middleware!

		At this point the errorHandler object has the following properties of statusCode, message and other related
	  stuff. Which'll then be returned by the error middleware.
		
		*/
	}

	return res.status(200).json({
		success: true,
		product,
	});
});
