import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      info: {},
      isLoading: false,
    }
  };

  async load(id) {
    this.setState(
      {
        ...this.getState(),
        isLoading: true,
      },
    );

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          info: json.result,
          isLoading: false,
        },
        'Загружены товары из АПИ',
      );

    } catch (e) {
      console.log(e.message)
    }

  }
};

export default Product
