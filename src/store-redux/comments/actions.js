import formsActions from '../forms/actions';

export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */

  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { comments: res.data.result.items, count: res.data.result.count } });
      } catch (e) {
        //Ошибка загрузки
        console.log(e)
      }
    };
  },

  send: data => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/send-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          method: "POST",
          body: JSON.stringify(data)
        });
        // комментарии добавлен успешно
        dispatch({ type: 'comments/send-success', payload: res.data.result });
        dispatch(formsActions.open('comment'))
      } catch (e) {
        //Ошибка загрузки
        console.log(e)
      }
    };
  },

  setActiveIdComment: (id, currentId, userName) => {
    return { type: 'comments/setActiveIdComment', payload: { id, currentId, userName } }
  }
};
