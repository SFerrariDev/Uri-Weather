export function getFormattedHour(time) {
	const date = new Date(time)
	let hours = date.getHours()
	let minutes = date.getMinutes()
	hours = hours.toString().padStart(2, '0')
	minutes = minutes.toString().padStart(2, '0')
	const formattedHour = `${hours}:${minutes}`
	return formattedHour
}
