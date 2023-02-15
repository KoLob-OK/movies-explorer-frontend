export function convertTime(dataMinutes) {
    const hours = Math.floor(dataMinutes / 60);
    const minutes = dataMinutes % 60;
    if (hours === 0) {
        return `${minutes}м`;
    } else if (minutes === 0) {
        return `${hours}ч`;
    } else {
        return `${hours}ч ${minutes}м`;
    }
}
