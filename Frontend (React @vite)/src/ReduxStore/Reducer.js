export const Reducer = (state = {
    isloggedin: localStorage.token ? true : false,
    currUser: JSON.parse(localStorage.getItem("currUser")),
    initials: localStorage.getItem("initials")
}, action) => {
    switch (action.type) {
        case "LOGIN": {
            state = { ...state }              //flow right to left
            state.isloggedin = true
            return state
        }
        case "CURRENT_USER": {
            state = { ...state }           
            state.currUser = action.payload
            return state
        }
        case "NAME_INITIALS": {
            state = { ...state }            
            state.initials = action.payload
            return state
        }
        case "TOTAL_REGISTERED": {
            state = { ...state }              
            state.totalRegistered = action.payload
            return state
        }
        default: return state
    }
};

export default Reducer