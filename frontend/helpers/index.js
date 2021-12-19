module.exports = {
    stringToArray: (string) => {
		let newArray = [];
		let ingredients = string.split(',');
		for (let i = 0; i < ingredients.length; i++) {
			let ingrediente = ingredients[i].split(':')
			newArray.push({name: ingrediente[0], quantity: ingrediente[1]});
		}
		return newArray;
	}
}