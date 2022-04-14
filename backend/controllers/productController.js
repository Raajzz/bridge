const Product = require("../models/productModel");

// admin + merchant

exports.createProduct = async (req, res, next) => {
	const product = await Product.create(req.body);
	// this req.body is the body of the post request, which'll be added to the database,
	// that is the reason why use async because we don't wanna get delayed
	res.status(201).json({
		// 201 means a resource has been created successfully
		success: true,
		product,
	});
};

// getting all the products in the collection

// async because we want to perform actions in an order

exports.getAllProducts = async (req, res) => {
	const products = await Product.find();

	res.status(200).json({
		// 201 means a resource has been created successfully
		success: true,
		products,
	});
};

// a put request to update the product

exports.updateProduct = async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
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
};

// delete the product

exports.deleteProduct = async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	await product.remove(); // just to remove a product

	res.status(200).json({
		success: true,
		message: "Product Deleted Successfully",
	});
};

// Get single product details

exports.getSingleProduct = async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product Not Found",
		});
	}
	return res.status(200).json({
		success: true,
		product,
	});
};
