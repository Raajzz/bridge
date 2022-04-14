module.exports = (checkFunc) => (req, res, next) => {
	Promise.resolve(checkFunc(req, res, next)).catch(next);
	// here, resolve is pretty much the try and catch is the catch
	// analogous to try..catch generally
};
