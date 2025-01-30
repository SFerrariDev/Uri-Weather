export function getDay() {
	const dias = [
		'Domingo',
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
	]
	const hoy = new Date().getDay()
	const resultado = []

	resultado.push('Hoy')
	resultado.push('Mañana')

	for (let i = 2; i < 7; i++) {
		const diaIndex = (hoy + i) % 7
		resultado.push(dias[diaIndex])
	}

	return resultado
}
