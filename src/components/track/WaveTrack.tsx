"use client"

import { useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {

	useEffect(() => {
		const htmlElement = document.getElementById("track-container")
		if (!htmlElement) return
		const wavesurfer = WaveSurfer.create({
			container: htmlElement,
			waveColor: 'rgb(200, 0, 200)',
			progressColor: 'rgb(100, 0, 100)',
			url: '/audio/maybeSound.mp3',
		  })

		  wavesurfer.on('click', () => {
			wavesurfer.play()
		  })
	}, [])

	return (
		<div id="track-container">
			Wave
		</div>
	)
}

export default WaveTrack




