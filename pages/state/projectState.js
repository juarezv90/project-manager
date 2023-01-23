
export const initialState = []

export const projectReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return(
                [...state, action.payload]
            )
        case "REMOVE":
            return(
               state.filter((project)=> project.id !== action.payload)
            )    
        default:
            return(state)
    }
}