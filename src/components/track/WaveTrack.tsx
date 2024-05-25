"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const searchParams = useSearchParams()
	const fileName = searchParams.get("audio")

	useEffect(() => {
		const htmlElement = containerRef.current
		if (!htmlElement) return
		const wavesurfer = WaveSurfer.create({
			container: htmlElement,
			waveColor: 'rgb(200, 0, 200)',
			progressColor: 'rgb(100, 0, 100)',
			url: `/api?audio=${fileName}`,
		  })

		  wavesurfer.on('click', () => {
			wavesurfer.play()
		  })
	}, [])

	return (
		<div ref={containerRef}>
			Wave
		</div>
	)
}

export default WaveTrack




