import type { TodoModel } from "@/models/TodoModel";

export function getTodos(projectId?: number): TodoModel[] {
  return JSON.parse(localStorage.getItem("todos") || "[]")
    .filter((x: TodoModel) => !projectId || x.projectId === projectId)
    .sort((a: TodoModel, b: TodoModel) => {
      if (a.projectId > b.projectId) {
        return 1;
      } else if (a.projectId < b.projectId) {
        return -1;
      }
      return a.index - b.index;
    });
}

export function createTodo(todo: TodoModel): TodoModel {
  const todos = getTodos();
  const id = Math.max(0, ...todos.map((x) => x.id)) + 1;
  const index =
    todo.index ||
    Math.max(
      0,
      ...todos.filter((x) => x.projectId === todo.projectId).map((x) => x.index)
    ) + 1;
  const todoToAdd = { ...todo, id, index } as TodoModel;
  todos.push(todoToAdd);
  localStorage.setItem("todos", JSON.stringify(todos));
  return todoToAdd;
}

export function editTodo(todo: TodoModel): TodoModel {
  const todos = getTodos();
  let todoToEdit = todos.find((x) => x.id === todo.id);
  if (todoToEdit) {
    todoToEdit = Object.assign(todoToEdit, todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    return todoToEdit;
  }
  throw "Todo not found";
}

export function deleteTodo(todo: TodoModel): void {
  const todos = getTodos();
  const todoIdxToDelete = todos.findIndex((x) => x.id === todo.id);
  if (todoIdxToDelete >= 0) {
    todos.splice(todoIdxToDelete, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    return;
  }
  throw "Todo not found";
}

export function deleteTodos(projectId: number): void {
  const todos = getTodos();
  localStorage.setItem(
    "todos",
    JSON.stringify(todos.filter((x) => x.projectId !== projectId))
  );
  return;
}

export function reorderTodos(
  projectId: number,
  oldIndex: number,
  newIndex: number
): void {
  const todos = getTodos();
  const indexShift = oldIndex > newIndex ? 1 : -1;
  const from = Math.min(oldIndex, newIndex);
  const to = Math.max(oldIndex, newIndex);
  const projectTodos = todos.filter((x) => x.projectId === projectId);

  let index = projectTodos[oldIndex].index;
  projectTodos[oldIndex].index = projectTodos[newIndex].index;
  projectTodos[newIndex].index = index;

  index = Math.min(projectTodos[oldIndex].index, projectTodos[newIndex].index);
  for (let i = from + 1; i < to; i++) {
    index = index + indexShift;
    projectTodos[i].index = index;
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  return;
}
