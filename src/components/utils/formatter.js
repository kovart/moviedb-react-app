export const Formatter = {
    formatDate(date) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        return `${date.getDay()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`
    },
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
