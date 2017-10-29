const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
        return todoItem
          .update({
            content: req.body.content || todoItem.content,
            todoId: req.body.todoId || todoItem.todoId,
            complete: req.body.complete || todoItem.complete,
          })
          .then(() => res.status(200).send(todoItem))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
