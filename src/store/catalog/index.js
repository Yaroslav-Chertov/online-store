import { codeGenerator } from '../../utils';
import StoreModule from '../module';
import { LIMIT } from '../../api';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalCount: 0,
      activePage: 1,
      isLoading: false,
    };
  };

  async load(page = 1) {
    const skip = (page - 1) * LIMIT;

    this.setState({
      ...this.getState(),
      isLoading: true,
    })
    const response = await fetch(`/api/v1/articles?limit=${LIMIT}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalCount: json.result.count,
        activePage: page,
        isLoading: false,
      },
      'Загружены товары из АПИ',
    );
  }
};

export default Catalog;
