import codeDescription from '../mocks/codeDescription.json'

export function getDescription(code) {
	const weatherDescription = codeDescription.weatherCode
	const description = weatherDescription[code] || 'No description available'

	return description
}
