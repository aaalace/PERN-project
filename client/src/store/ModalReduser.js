const defaultParams = {open: false, id: 0, name: '', description: ''}

export function modalReduser(state = defaultParams, action){
    switch (action.type){
        case "OPEN MODAL":
            return (
            {open: !state.open, id: action.payload.id, name: action.payload.title, description: action.payload.description}
            )

        case "CLOSE MODAL":
            return (
                {open: !state.open, id: 0, name: '', description: ''}
            )
        
        case "ADD INFO":
            console.log('info', action.payload.description)
            async function addInfo() {
                let response = await fetch(`http://localhost:5000/todos/${state.id}`, {
                    "method": "PUT",
                    "headers": {"Content-Type": "application/json"},
                    "body": JSON.stringify({action: 'description', description: action.payload.description})
                })
                response = await response.json()
              }
            addInfo()
            return (
                {open: state.open, id: state.id, name: state.name, description: action.payload.description}
            )

        default:
            return state
    }
}
