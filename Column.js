function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = generateTemplate('column-template', {
		name: this.name,
		id: this.id
	});

	this.element.querySelector('.column').addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-delete')) {
			self.removeColumn();
		}

		if (event.target.classList.contains('add-card')) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();

			var data = {
				name: cardName,
				bootcamp_kanban_column_id: id,
				};
				
				var jsonData = JSON.stringify(data);
				console.log (jsonData);

				fetch(baseUrl + '/card', {
				method: 'POST',
				headers: myHeaders,
				body: jsonData,
				})
				.then(function (res) {
					return res.json();
				})
				.then(function (resp) {
					var card = new Card(resp.id, cardName);
					self.addCard(card);
				});
		}

		if (event.target.classList.contains('column-title')) {
			var newColumnName = prompt("Change the name of the column");
			newColumnName = newColumnName || event.target.value;
			event.preventDefault();

			var data = {
				name: newColumnName
			};
			var jsonData = JSON.stringify(data);
			console.log(jsonData);

			var columnId = event.target.parentNode.querySelector('[id]').id;

			fetch(baseUrl + '/column/' + columnId, {
				method: 'PUT',
				headers: myHeaders,
				body: jsonData,
			})
				.then(function (resp) {
					console.log("It works 1");
					return resp.json();
					
				})
				.then(function (resp) {
					event.target.innerText = newColumnName;
					console.log("It works 2")
				});

		}
	});
}

Column.prototype = {
	addCard: function (card) {
		this.element.querySelector('ul').appendChild(card.element);
	},

	removeColumn: function () {
		var self = this;
		fetch(baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				self.element.parentNode.removeChild(self.element);
			});
	},

	changeColumnName: function () {
		var columnName = this.getElementsByTagName('h2')[0];
		columnName = newColumnName;
		console.log(columnName);
	},
};