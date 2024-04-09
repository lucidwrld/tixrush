export function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url) || url?.includes('placeimg');
}
export const fecthLowerPrice = arr => {
    if (arr.length > 0) {
        var lowest = Number.POSITIVE_INFINITY
        var highest = Number.NEGATIVE_INFINITY
        var tmp
        for (var i = arr.length - 1; i >= 0; i--) {
            tmp = arr[i].price
            if (tmp < lowest) lowest = tmp
            if (tmp > highest) highest = tmp
        }
        return lowest.toLocaleString()
    } else {
        return 'N/A'
    }
}

export const makeRepeated = (arr, repeats) =>
    Array.from({ length: repeats }, () => arr).flat()


export function convertTo12HourFormat(time) {
    if (time) {
        const [hours, minutes] = time.split(':');

        let hoursNum = parseInt(hours, 10);

        const period = hoursNum >= 12 ? 'PM' : 'AM';

        if (hoursNum > 12) {
            hoursNum -= 12;
        } else if (hoursNum === 0) {
            hoursNum = 12;
        }

        const time12 = `${hoursNum.toString().padStart(2, '0')}:${minutes} ${period}`;
        return time12;
    } else {
        return '00:00'
    }

}