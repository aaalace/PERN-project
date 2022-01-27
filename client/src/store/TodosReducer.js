export function todosReduser(state = [], action){
    switch (action.type){
        case "ADD TODO":
            return (
            state.concat({
                id: action.payload.id,
                title: action.payload.title,
                pages: action.payload.pages,
                completed: false,
                ren: false,
                description: action.payload.description
              })
            )
            
        case "DELETE ALL TODOS":
            async function delTodos() {
                let response = await fetch("http://localhost:5000/todos", {
                    "method": "DELETE"
                    })
                response = await response.json()
                console.log(response)
              }
            delTodos()
            return ([])
        
        case "DELETE TODO":
            async function delTodo() {
                let response = await fetch(`http://localhost:5000/todos/${action.payload.id.toString()}`, {
                  "method": "DELETE"
                })
                response = await response.json()
              }
            delTodo()
            return (
                state.filter(todo => todo.id !== action.payload.id)
            )

        case "TOGGLE TODO":
          async function toggleTodo() {
            let response = await fetch(`http://localhost:5000/todos/${action.payload.id.toString()}`, {
                "method": "PUT",
                "headers": {"Content-Type": "application/json"},
                "body": JSON.stringify({action: 'toggle', completed: action.payload.completed})
            })
            response = await response.json()
          }
          toggleTodo()
          return (state.map((todo => todo.id === action.payload.id ? 
            {id: todo.id, title: todo.title, pages: todo.pages, completed: !todo.completed, ren: todo.ren, description: todo.description} : todo)))
            
        case "RENAME TODO":
          async function renameTodo() {
              let response = await fetch(`http://localhost:5000/todos/${action.payload.id.toString()}`, {
                  "method": "PUT",
                  "headers": {"Content-Type": "application/json"},
                  "body": JSON.stringify({action: 'rename', title: action.payload.title})
              })
              response = await response.json()
            }
          renameTodo()
          return (state.map((todo => todo.id === action.payload.id ? 
            {id: todo.id, title: action.payload.title, pages: todo.pages, completed: todo.completed, ren: todo.ren, description: todo.description} : todo)))
        
        case "IS ON RENAME TODO":
          return (state.map((todo => todo.id === action.payload.id ? 
            {id: todo.id, title: todo.title, pages: todo.pages, completed: todo.completed, ren: !todo.ren, description: todo.description} : todo)))
        
        case "ADD DESCRIPTION":
          console.log('desc', state)
          console.log('desc', action.payload)
          return (state.map((todo => todo.id === action.payload.id ? 
            {id: todo.id, title: todo.title, pages: todo.pages, completed: todo.completed, ren: todo.ren, description: action.payload.description} : todo)))

        default:
            return state
    }
}
