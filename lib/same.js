"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (left, right) {
	if (left.length !== right.length) {
		return false;
	}
	for (var i in left) {
		if (right[i] !== left[i]) {
			return false;
		}
	}
	return true;
};

module.exports = exports["default"];