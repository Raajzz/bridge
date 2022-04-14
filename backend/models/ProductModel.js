const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter Product Name"],
		trim: true, // white spaces will be removed from both sides
		// of the string
	},
	description: {
		type: String,
		required: [true, "Please Enter Product Description"],
	},
	price: {
		type: Number,
		required: [true, "Please Enter Product Price"],
		maxLength: [8, "Price cannot exceed 8 characters"],
	},
	// maybe the overall rating
	rating: {
		type: Number,
		default: 0,
	},
	// provided by cloudinary
	images: [
		{
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
	],
	category: {
		type: String,
		// may need to change this to [String] because a product can be of multiple
		// categories
		required: [true, "Please Enter Product Category"],
	},
	stock: {
		type: Number,
		required: [true, "Please Enter Product Stock"],
		maxLength: [4, "Stock cannot exceed 4 characters"],
		default: 0, // can be 1 also, but I feel no stock to begin
		// with makes more sense
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true, // although can be false too
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", productSchema);
