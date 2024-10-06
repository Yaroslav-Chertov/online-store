import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
    };
  };

  async load() {

    const res = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await res.json();

    this.setState({
      list: json.result.items
    })
  }
};

export default CategoriesState;
