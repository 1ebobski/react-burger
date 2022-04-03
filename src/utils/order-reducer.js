const initialOrderState = { content: null, id: undefined };

function orderReducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialOrderState;
    case "set-id":
      return {
        ...state,
        id: action.id,
      };
    case "set-content":
      return {
        ...state,
        content: {
          bun: action.content.bun,
          filling: [...action.content.filling],
        },
      };
  }
}

export { initialOrderState, orderReducer };
