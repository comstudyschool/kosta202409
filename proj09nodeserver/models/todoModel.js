const todoList = [
    {id:1, title: "마라탕 먹기", done: false},
    {id:2, title: "과제 하기", done: true}
];
let seqId = 103;

const TodoDAO = {
    findAll: ()=>{
        return [...todoList];
    },
    findById: (id)=>{
        const idx = todoList.findIndex((todo)=>{
            return todo.id === id;
        });
        if(idx !== -1) {
            return todoList[idx];
        }
        return {};
    },
    todoeate: (dto)=>{
        todoList.push(dto);
    },
    update: (id, dto)=>{
        const idx = todoList.findIndex((todo)=>{
            return todo.id === id;
        });
        if(idx !== -1) {
            todoList[idx] = dto;
        }
    },
    delete: (id)=>{
        const idx = todoList.findIndex((todo)=>{
            return todo.id === id;
        });
        if(idx !== -1) {
            todoList.splice(idx, 1);
        }
    }
};

module.exports = TodoDAO;