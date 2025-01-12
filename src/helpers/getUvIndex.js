export const getUvIndex = (uvCode) => {
    const uvCodeValue = uvCode;
    const getUvLevel = () => {
        if (uvCodeValue <= 2) {
            return 'Bajo';
        } else if (uvCodeValue <= 5) {
            return 'Moderado';
        } else if (uvCodeValue <= 7) {
            return 'Alto';
        } else if (uvCodeValue <= 10) {
            return 'Muy alto';
        } else {
            return 'Extremo';
        }
    }
    const uvLevel = getUvLevel();
    return (uvLevel);
}