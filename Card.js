// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = generateTemplate('card-template', {
		description: this.name,
		id: this.id
	}, 'li');

	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();

		if (event.target.classList.contains('btn-delete')) {
			self.removeCard();
		}

		if (event.target.classList.contains('card')) {
			var newCardName = prompt("Change the name of the card");
			event.preventDefault();

			var data = {
				name: newCardName,
				bootcamp_kanban_column_id: event.target.parentNode.querySelector('column-card-list').id
			};
			console.log(data.bootcamp_kanban_column_id);

			var jsonData = JSON.stringify(data);
			console.log(jsonData);

			var cardId = event.target.id;

			console.log(cardId);

			fetch(baseUrl + '/card/' + cardId, {
				method: 'PUT',
				headers: myHeaders,
				body: jsonData,
			})
				.then(function (resp) {
					console.log("It works 1");
					return resp.json();
				})
				.then(function (resp) {
					event.target.innerText = newCardName;
					console.log("It works 2")
				});
		}
	});
}
Card.prototype = {
	removeCard: function () {
		var self = this;

		fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				self.element.parentNode.removeChild(self.element);
			})
	}
}