class MainApi {
    constructor(options) {
        // baseUrl - базовая часть url-адреса запроса
        this._baseUrl = options.baseUrl;
        // headers - заголовки запроса
        this._headers = options.headers;
    }

    // Метод проверки статуса ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    // Метод регистрации пользователя (принимает объект с 3-мя параметрами: name, email, password)
    // отправляет объект с данными пользователя {name, email, password}
    // возвращает промис {Promise} - объект нового пользователя с _id
    register({ name, email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод авторизации пользователя (принимает объект с 2-мя параметрами: email-почта, password-пароль)
    // отправляет объект с данными пользователя {email, password}
    // возвращает промис {Promise} - токен пользователя
    authorize({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод проверки токена пользователя (принимает токен)
    // отправляет токен пользователя
    // возвращает промис {Promise} - 2 параметра: _id и email
    checkUser(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод получения данных пользователя с сервера
    // получает данные текущего пользователя и
    // возвращает промис {Promise} - объект текущего пользователя
    getUserData(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод изменения данных пользователя data (имеет 2 параметра: name, email + авторизацию)
    // возвращает промис {Promise} - новый объект пользователя
    changeUserData({ name, email }, jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод получения всех сохраненных фильмов (параметр - jwt)
    // получает карточки сохраненных фильмов с сервера и
    // возвращает промис {Promise} - массив карточек
    getSavedMovies(jwt) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод добавления карточки фильма в сохраненные (объект имеет параметры: объект-фильм + авторизация-jwt)
    // возвращает промис {Promise} - объект новой карточки
    saveMovie(movie, jwt) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                id: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                director: movie.director,
                country: movie.country,
                year: movie.year,
                duration: movie.duration,
                description: movie.description,
                trailerLink: movie.trailerLink,
                image: movie.image,
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод удаления фильма с идентификатором id (принимает id + авторизация-jwt)
    // возвращает промис {Promise} - ответ с сервера
    delMovie(id, jwt) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

/*    // Метод изменения лайка карточки (имеет 2 свойства: cardID-идентификатор, isLiked-статус)
    // возвращает промис {Promise} - массив новых лайков
    changeLikeCardStatus(cardID, isLiked, jwt) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }*/
}

/*++++++++++++++++++++API+++++++++++++++++++++++*/
const mainApi = new MainApi({
    baseUrl: 'https://api.movexplorer.kolobok.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
});

export default mainApi;
