import { convertDuration, shouldUpdateList, getVideoId } from './index'

describe('convertDuration tests', () => {
	it('converts ok with valid full input', () => {
		const result = convertDuration('PT4M2S')
		expect(result).toBe('4.2')
	})

	it('converts ok with valid partial input', () => {
		const result = convertDuration('PT4M')
		expect(result).toBe('4.')
	})

	it('converts ok with invalid input', () => {
		const result = convertDuration('PT')
		expect(result).toBe('')
	})
})

describe('shouldUpdateList tests', () => {
	const list1 = [{name: '1', id: 'test 1'}, {name: '2', id: 'test 2'}]
	const list2 = [{name: '3', id: 'test 3'}, {name: '2', id: 'test 2'}]
	const list3 = [{name: '2', id: 'test 2'}]
	it('recognizes 2 lists as the same', () => {
		const result = shouldUpdateList(list1, list1)
		expect(result).toBe(false)
	})

	it('recognizes 2 lists with same length as different', () => {
		const result = shouldUpdateList(list1, list2)
		expect(result).toBe(true)
	})

	it('recognizes 2 lists as different', () => {
		const result = shouldUpdateList(list1, list3)
		expect(result).toBe(true)
	})
})

describe('getVideoId tests', () => {
	const urls = [
		'//www.youtube-nocookie.com/embed/up_lNV-yoK4?rel=0',
		'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo',
		'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
		'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
		'http://www.youtube.com/user/SilkRoadTheatre#p/a/u/2/6dwqZw0j_jY',
		'http://youtu.be/6dwqZw0j_jY',
		'http://www.youtube.com/watch?v=6dwqZw0j_jY&feature=youtu.be',
		'http://youtu.be/afa-5HQHiAs',
		'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo?rel=0',
		'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
		'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
		'http://www.youtube.com/embed/nas1rJpm7wY?rel=0',
		'http://www.youtube.com/watch?v=peFZbP64dsU',
		'http://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player',
		'http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
		'http://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
		'http://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player'
	]

	const ids = [
		'up_lNV-yoK4',
		'1p3vcRhsYGo',
		'cKZDdG9FTKY',
		'yZ-K7nCVnBI',
		'6dwqZw0j_jY',
		'6dwqZw0j_jY',
		'6dwqZw0j_jY',
		'afa-5HQHiAs',
		'1p3vcRhsYGo',
		'cKZDdG9FTKY',
		'yZ-K7nCVnBI',
		'nas1rJpm7wY',
		'peFZbP64dsU',
		'dQw4w9WgXcQ',
		'dQw4w9WgXcQ',
		'dQw4w9WgXcQ',
		'dQw4w9WgXcQ'
	]
	it('gets the correct id from each url', () => {
		urls.forEach((item, index) => {
			let result = getVideoId(item)
			expect(result).toBe(ids[index])
		})
	})

	it('returns false from a bad url', () => {
		const result = getVideoId('testing-123')
		expect(result).toBe(false)
	})

	it('returns false from an empty input', () => {
		const result = getVideoId(null)
		expect(result).toBe(false)
	})
})
