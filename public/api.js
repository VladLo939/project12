class Api{
  constructor(config){
    this.url = config.url,
    this.headers = config.headers
  }

  getUserData(){
    return fetch(`${this.url}/users/me`, {
        method: 'GET',
        headers: this.headers,
    })
      .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
          return res.json()
      });
  }

  getCardsData(){
      return fetch(`${this.url}/cards`, {
          method: 'GET',
          headers: this.headers,
      })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
        return res.json()
    });
  }

  editUserData(name, about){
      return fetch(`${this.url}/users/me`, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({
            name: name,
            about: about, 
          })
      })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
        return res.json()
    });
  }


}