// Начальное состояние
const initialState = {
  name: 'comment',
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'form/open':
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};

export default reducer;
