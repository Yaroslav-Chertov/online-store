import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      userName: '',
      token: '',
      error: '',
      isAuth: false,
      waiting: true,
    };
  }

  /**
   * Установка кода языка (локали)
   * @param lang
   */
  async logIn(data) {
    this.setState(this.initState());

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const json = await res.json()

      if (!json.error) {
        this.setState({
          ...this.getState(),
          token: json.result.token,
          userName: json.result.user.profile.name,
          isAuth: true,
          waiting: false,
        })

        window.localStorage.setItem('token', json.result.token)
      } else {

        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message,
          waiting: false,
        })
      }

    } catch (e) {
      console.log(e);
    }
  };

  async logOut() {
    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json',
        },
      })

      window.localStorage.removeItem('token')

    } catch (e) {
      console.log(e)
    }
    this.setState({
      ...this.initState(),
      waiting: false
    })
  };

  async getSession() {
    const token = localStorage.getItem('token');

    if (token) {
      const res = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        }
      })
      const json = await res.json()

      if (!json.error) {
        this.setState({
          ...this.getState(),
          token,
          userName: json.result.profile.name,
          isAuth: true,
          waiting: false,
        })

      }
    }

  }
};

export default AuthState;
