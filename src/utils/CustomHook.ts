import { useEffect, useState } from "react";
import WaveSurfer from 'wavesurfer.js'
import { WaveSurferOptions } from 'wavesurfer.js'

export const useHasMounted = () => {
	const [hasMounted, setHasMounted] = useState<boolean>(false);

	useEffect(() => {
		setHasMounted(true);
	});

	return hasMounted;
};

export const useWaveSurfer = (containerRef: React.RefObject<HTMLDivElement>, options: Omit<WaveSurferOptions, "container">) => {
	const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const ws = WaveSurfer.create({
			...options,
			container: containerRef.current
		})

		setWaveSurfer(ws)

		return () => {
			ws.destroy()
		}
	}, [options, containerRef])

	return waveSurfer
}
