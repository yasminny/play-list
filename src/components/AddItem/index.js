import React, { useState } from 'react'
import './Input.css'

function Input({ addNewVideo }) {
	const [videoData, setVideoData] = useState(null)
	return (
		<div className="inputWrapper">
			<input
				onChange={(e) => setVideoData(e.target.value)}
				type="text"
				placeholder="Enter Video URL"
				onKeyPress={(e) => {
					const key = e.which || e.keyCode
					if (key === 13) {
						addNewVideo(videoData)
					}
				}}
			/>
			<button onClick={() => addNewVideo(videoData)}>Add</button>
		</div>
	)
}

export default Input

