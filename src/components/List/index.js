import React from 'react'
import ViewItems from '../ViewItems'
import AddItem from '../AddItem'
import './List.css'

function List({ list, addNewVideo, badInput, deleteVideoFromDb }) {
	return (
		<div className="listWrapper">
			{
				badInput && <p className="error">This is not a valid video Id, try again?</p>
			}
			<AddItem addNewVideo={addNewVideo}/>
			<ViewItems list={list} deleteVideoFromDb={deleteVideoFromDb}/>
		</div>
	)
}

export default List
