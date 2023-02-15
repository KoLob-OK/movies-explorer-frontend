class MoviesApi {
    constructor(movieUrl) {
        // movieUrl - url-адрес запроса фильмов
        this._movieUrl = movieUrl;
    }

    // Метод проверки статуса ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    // Метод получения всех фильмов с сервера BeatfilmMoviesApi
    // получает начальные карточки фильмов с сервера и
    // возвращает промис {Promise} - массив карточек
    getMovies() {
        return fetch(`${this._movieUrl}/beatfilm-movies`, {
            method: 'GET',
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }
}

/*++++++++++++++++++++API+++++++++++++++++++++++*/
const moviesApi = new MoviesApi({
    movieUrl: 'https://api.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
});

export default moviesApi;
