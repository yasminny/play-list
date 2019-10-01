export const convertDuration = text => {
	return text.replace('PT', '').replace('M', '.').replace('S', '')
}

export const shouldUpdateList = (list, newList) => {
	const listValues = JSON.stringify(Object.values(list))
	const listNewValues = JSON.stringify(Object.values(newList))
	return !(listValues === listNewValues)
}

export const getVideoId = text => {
	if (!text) return false
	const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
	const match = text.match(regExp);
	if (match && match[2].length === 11) {
		return match[2];
	} else {
		return false
	}
}
