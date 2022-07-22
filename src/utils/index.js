export function secondToTime(time) {
    // >100000为毫秒单位
    time = parseInt(time)
    if (time > 10000) {
        time = Math.floor(time / 1000);
    } else {
        time = Math.floor(time)
    }
    if (time<3600) {
        let m = Math.floor(time / 60)
        let s = Math.floor(time % 60)
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        return m + ':' + s
    } else {
        let h = Math.floor(time/3600)
        time = Math.floor(time % 3600)
        let m = Math.floor(time/60)
        let s = Math.floor(time % 60)
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        return h + ':' + m + ':' + s
    }
}

export function zipNumber(num) {
    if (num > 10000) {
        num = Math.floor(num / 10000)
        return num + '万';
    } else {
        return num;
    }
}