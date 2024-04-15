const initialState = {
    userData: {},
    requestsData: [],
}

export const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'setUserData':
        return { ...state, userData: payload }

    case 'unsetUserData':
        return { ...state, userData: {} }
    
    case 'setRequests':
        return { ...state, requestsData: payload }

    case 'unsetRequests':
        return { ...state, requestsData: [] }
    
  default:
    return state
  }
}
