class ApiFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr; // the key value pair after '?' in an url
	}

	search() {
		const keyword = this.queryStr.keyword
			? {
					name: {
						$regex: this.queryStr.keyword,
						$options: "i", // small "i" means case insensitive
					},
			  }
			: {};
		console.log(keyword);
		this.query = this.query.find({ ...keyword });
		return this;
	}

	filter() {
		const queryCopy = { ...this.queryStr };
		// removing query params for filtering
		const removeFields = ["keyword", "page", "limit"];
		removeFields.forEach((key) => delete queryCopy[key]);

		// filtering for price

		console.log(queryCopy);

		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

		// this is to just search without doing an regex or whatnot
		this.query = this.query.find(JSON.parse(queryStr));

		console.log(queryStr);

		return this;
	}

	pagination(productCount, resultPerPage) {
		// if page query param does not exist then the default page
		// shall be 1
		const currentPage = this.queryStr.page || 1;

		const skip = resultPerPage * (currentPage - 1);
		// find everything - this.query
		// while finding everything just get around 10 products - limit(resultPerPage)
		// while getting that 10 products, skip the first `skip` number of products

		this.query = this.query
			.limit(resultPerPage)
			.skip(
				skip >= productCount
					? skip -
							resultPerPage *
								(currentPage - Math.ceil(productCount / resultPerPage))
					: skip
			);
		return this;
	}
}

module.exports = ApiFeatures;
