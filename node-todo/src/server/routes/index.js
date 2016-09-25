module.exports = function(app) {
    var api = '/api';
    var data = '/../../data/';
    var todosModel = require('../data/todosModel');

    app.get(api + '/todos/:id', getTodo);
    app.get(api + '/todos', getTodos);
    app.delete(api + "/todos/:id", deleteTodo);
    app.put(api + "/todos/:id", updateTodo);
    app.post(api + "/todos", createTodo);

    function getTodo(req, res, next) {

        try {
            res.send(todosModel.getTodo(req.params.id));
        } catch (e) {
            return next(e);
        }
    }

    function getTodos(req, res, next) {

        try {
            res.send(todosModel.getTodos());
        } catch (e) {
            return next(e);
        }
    }

    function deleteTodo(req, res, next) {

        try {
            res.send(todosModel.delTodo(req.params.id));
        } catch (e) {
            return next(e);
        }
    }

    function updateTodo(req, res, next) {
        try {
            res.send(todosModel.updateTodo(req.body, req.params.id));
        } catch (e) {
            return next(e);
        }
    }

    function createTodo(req, res, next) {
        res.send(todosModel.createTodo(req.body));
    }
};
