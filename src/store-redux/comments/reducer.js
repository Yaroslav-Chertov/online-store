export const initialState = {
  comments: [],
  count: 0,
  activeIdComment: null,
  currentId: null,
  userName: '',
  waiting: false, // признак ожидания загрузки
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, comments: [], waiting: true };

    case 'comments/load-success':
      return { ...state, comments: action.payload.comments, count: action.payload.count, waiting: false };

    case "comments/send-start":
      return { ...state, waiting: true };

    case "comments/send-success":
      return {
        ...state,
        comments: [...state.comments, action.payload],
        count: state.count + 1,
        activeIdComment: null,
        currentId: null,
        waiting: false
      };

    case 'comments/setActiveIdComment':
      return {
        ...state,
        activeIdComment: action.payload.id,
        currentId: action.payload.currentId,
        userName: action.payload.userName,
      }
    default:
      // Нет изменений
      return state;
  };
};

export default reducer;
