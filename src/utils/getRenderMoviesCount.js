export default function getRenderMoviesCount() {
    let countMovies = 0;
    const clientWidth = document.documentElement.clientWidth;
    const countMoviesSettings = {
        '1164': [12, 4], // 'разрешение экрана': [начальное количество фильмов, загружаемое количество по клику "Ещё"]
        '984': [9, 3],
        '568': [8, 2],
        '280': [5, 2],
    };

    Object.keys(countMoviesSettings)
        .sort((initial, add) => initial - add)
        .forEach((i) => {
            if (clientWidth > +i) {
                countMovies = countMoviesSettings[i];
            }
        });

    return countMovies;
}
