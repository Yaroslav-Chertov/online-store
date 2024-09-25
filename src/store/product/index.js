import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      info: {},
    }
  }

  async load(id) {

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          info: json.result,
        },
        'Загружены товары из API',
      );

    } catch (e) {
      console.log(e.message)
    }

  }
}

export default Product
