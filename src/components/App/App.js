import React, { useEffect, useState } from 'react'
import './App.css'
import List from '../List'
import Player from '../Player'
import axios from 'axios'
import { convertDuration, shouldUpdateList, getVideoId } from '../../utils'
const KEY = 'AIzaSyD3KT8WroEPAiXRqbXhvL_R4VxAHjQvjnM'
const youTube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/'
})
const firebaseConfig = {
  apiKey: "AIzaSyCox0q4_z4GfDco7A9WlG2RAN58LVmggh4",
  authDomain: "play-list-yasminny.firebaseapp.com",
  databaseURL: "https://play-list-yasminny.firebaseio.com",
  projectId: "play-list-yasminny",
  storageBucket: "",
  messagingSenderId: "290433108286",
  appId: "1:290433108286:web:26c98a553d8b9225d4446f",
  measurementId: "G-850CFG5KTP"
}

let videosRef

function App() {
  const [list, setList] = useState([])
  const [badInput, setBadInput] = useState(false)

  useEffect(() => {
    getDbList()
    setTimeout(getDbList, 1000)
  })

  const initFireBase = () => {
    const defaultProject = window.firebase.initializeApp(firebaseConfig)
    const db = defaultProject.firestore()
    videosRef = db.collection("videos")
  }

  async function getDbList() {
    if (!videosRef) {
      initFireBase()
    }
    videosRef.get().then(function(querySnapshot) {
      let newList = []
      querySnapshot.forEach(function (doc) {
        newList.push(doc.data())
      })
      if (shouldUpdateList(list, newList)) setList(newList)
    })
  }

  const handleInput = async (text) => {
    const videoId = getVideoId(text)
    setBadInput(!!!videoId)
    if (!videoId) return
    const data = await getVideoData(videoId)
    addNewVideoToDb({
    length: Number(convertDuration(data.contentDetails.duration)),
    name: data.snippet.title,
    vid: videoId
    })
  }

  const addNewVideoToDb = (data) => {
    const timeStamp = Date.now()
    videosRef.doc(timeStamp.toString()).set({ ...data, timeStamp: timeStamp.toString() })
    getDbList()
  }

  const getVideoData = async (videoId) => {
      const response = await youTube.get('/videos', {
        params: {
          id: videoId,
          part: 'snippet,contentDetails',
          key: KEY
        }
      })
    return response.data.items[0]
  }

  const deleteVideoFromDb = (id) => {
    videosRef.doc(id).delete()
    getDbList()
  }

  return (
    <div className="App">
      <List
        list={list}
        addNewVideo={handleInput}
        badInput={badInput}
        deleteVideoFromDb={deleteVideoFromDb}
      />
      <Player
        video={list[0]}
        deleteVideoFromDb={deleteVideoFromDb}
      />
    </div>
  )
}

export default App
