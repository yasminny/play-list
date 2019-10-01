import React from 'react'
import YouTube from 'react-youtube'

function Player({ video, deleteVideoFromDb }) {
	return <YouTube
		videoId={(video && video.vid) || null }
		opts={{
			height: '390',
			width: '640',
			playerVars: { autoplay: 1 }
		}}
		onEnd={() => deleteVideoFromDb(video.timeStamp)}
	/>
}

export default Player
