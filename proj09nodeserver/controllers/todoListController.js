module.exports.getAllTodolist = (req, res) => {
    res.end("모든 Todolist 조회 기능");
}

module.exports.getTodolistById = (req, res) => {
    res.end("특정 Todo 조회 기능");
}

module.exports.createTodolist = (req, res) => {
    res.end("새 Todo 생성 기능");
}

module.exports.modifyTodolistById = (req, res) => {
    res.end("Todo 수정 기능");
}

module.exports.deleteTodolistById = (req, res) => {
    res.end("Todo 삭제 기능");
}