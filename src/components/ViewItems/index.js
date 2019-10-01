import React from 'react'
import './ViewItems.css'

function ViewItems({ list, deleteVideoFromDb }) {
	return (
		<div className="list">
			{
				list.map( item => <div
					key={item.timeStamp}
					className="item"
					onClick={() => {deleteVideoFromDb(item.timeStamp)}}
				>
					<p>{item.name}</p>
					<p className="duration">{item.length}</p>
					<span>click to delete</span>
				</div>)
			}
		</div>
	)
}

export default ViewItems
