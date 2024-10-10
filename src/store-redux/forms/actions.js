export default {
  /**
   * Отображение формы по названию
   * @param name
   */

  open: name => {
    return { type: 'form/open', payload: { name } };
  },
};
