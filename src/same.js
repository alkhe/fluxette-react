export default (left, right) => {
	if (left.length !== right.length) {
		return false;
	}
	for (let i in left) {
		if (right[i] !== left[i]) {
			return false;
		}
	}
	return true;
}
