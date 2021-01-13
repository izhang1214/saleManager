export const timeMixin = {
    methods: {
        getTime(rawDate) {
            let hours;
            let day;
            let month;
            let minutes;
            let seconds;
            if (rawDate.getHours().toString().length === 1) {
                hours = `0${rawDate.getHours()}`;
            } else {
                hours = `${rawDate.getHours()}`;
            }

            if (rawDate.getDate().toString().length === 1) {
                day = `0${rawDate.getDate()}`;
            } else {
                day = `${rawDate.getDate()}`;
            }
            if (rawDate.getMonth().toString().length === 1) {
                month = `0${rawDate.getMonth() + 1}`;
            } else {
                month = `${rawDate.getMonth() + 1}`;
            }
            if (rawDate.getMinutes().toString().length === 1) {
                minutes = `0${rawDate.getMinutes() + 1}`;
            } else {
                minutes = `${rawDate.getMinutes() + 1}`;
            }
            if (rawDate.getSeconds().toString().length === 1) {
                seconds = `0${rawDate.getSeconds() + 1}`;
            } else {
                seconds = `${rawDate.getSeconds() + 1}`;
            }
            return `${rawDate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
        }
    }
}