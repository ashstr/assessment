var data = '/../data/';
var jsonfileservice = require('../utils/jsonfileservice')();
var Todo = require("./todo.js");
var Joi = require('joi');

module.exports = function() {
	var todos = todos ? todos : jsonfileservice.getJsonFromFile(data + 'todos.json');

	function getTodos() {
		return todos;
	}

	function getTodo(id) {
		var tds = todos.filter(function(t) {
			return t.id === id;
		});
		return tds[0];
	}

	function delTodo(id) {
		todos = todos.filter(function(t) {
			return t.id !== id;
		});
		jsonfileservice.updateJsonIntoFile(data + 'todos.json', todos);
		return todos;
	}

	function updateTodo(obj, id) {
		todos = todos.filter(function(t) {
			if (t.id === id) {
				t.text = obj.text ? obj.text : t.text;
				t.priority = obj.priority ? obj.priority : t.priority;
				t.done = obj.done ? obj.done : t.done;
				Joi.validate(obj, Todo, function(err, val) {
					if (err) {
						throw err;
					}
				});
			}
			return true;
		});
		jsonfileservice.updateJsonIntoFile(data + 'todos.json', todos);
		return getTodo(id);
	}


	function createTodo(obj) {
		return Joi.validate(obj, Todo, function(err, val) {
			console.log(err);
			if (err) {
				throw err;
			}
			todos.push(val);
			jsonfileservice.updateJsonIntoFile(data + 'todos.json', todos);
			return val;
		});

	}
	return {
		getTodos: getTodos,
		getTodo: getTodo,
		delTodo: delTodo,
		updateTodo: updateTodo,
		createTodo: createTodo
	}
}();
