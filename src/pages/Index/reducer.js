const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                count: state.count + 1
            }
            break
        default:
            break
    }

}
export default reducer