import StoreModule from '../module';

/**
 * Детальная информация о товаре для страницы товара
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
    };
  };

  async load() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        headers: {
          'X-Token': this.store.getState().auth.token,
          'Content-Type': 'application/json',
        }
      }
      );
      const json = await response.json();
      // Товар загружен успешно
      this.setState(
        {
          data: json.result,
          waiting: false,
        },
        'Загружен профиль из АПИ',
      );
    } catch (e) {
      console.log(e)
    }
  }
};

export default ProfileState;
