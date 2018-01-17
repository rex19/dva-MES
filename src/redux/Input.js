const input = (state = {}, action) => {
    console.log('inputReducers', state)
    switch (action.type) {
        case "InputSuccess":
            return {
                'isAdd': true,
            };
        case "InputFailure":
            return {
                'isAdd': false,

            };
        default:
            return state;
    }
}
export default input;