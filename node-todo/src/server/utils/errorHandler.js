module.exports = function() {
	var service = {
		init: init,
	};
	return service;

	function init(err,req, res, next) {		
		res.status(500).send({ 'err': err });
	}
};
