import React from 'react'
import {background, items} from './config'
import {Sequence} from 'remotion'
import {MusicPlayer} from './MusicPlayer'
import {AudioData, useAudioData} from '@remotion/media-utils'

const Main: React.FC = () => {
	const audioDatas: AudioData[] = []

	for (const item of items) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const data = useAudioData(item.audio)
		if (data) {
			audioDatas.push(data)
		}
	}

	if (audioDatas.length !== items.length) return null

	let current = 0

	return (
		<div
			style={{
				background: '#000',
				width: '100%',
				height: '100%',
			}}
		>
			{items.map((x, i) => (
				<Sequence
					key={i}
					from={(() => {
						const c = current

						current += Math.ceil(audioDatas[i].durationInSeconds * 60)

						return c
					})()}
					durationInFrames={
						Math.ceil((audioDatas[i]?.durationInSeconds || 0) * 60) || 1
					}
				>
					<MusicPlayer {...x} />
				</Sequence>
			))}

			<div
				style={{
					position: 'fixed',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					background: background ? `url(${background})` : '#000',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					filter: 'blur(10px) brightness(0.5)',
				}}
			/>
		</div>
	)
}

export default Main
