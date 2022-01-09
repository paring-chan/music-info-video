import {Composition} from 'remotion'
import {MusicPlayer} from './MusicPlayer'
import React from 'react'
import {AudioData, useAudioData} from '@remotion/media-utils'
import {items} from './config'
import Main from './Main'

export const RemotionVideo: React.FC = () => {
	const audioDatas: (AudioData | null)[] = []

	let duration = 0

	for (const item of items) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const data = useAudioData(item.audio)
		audioDatas.push(data)

		if (data) {
			duration += Math.ceil(data.durationInSeconds * 60)
			// if (audioDatas.length > 1) {
			// 	duration += 60;
			// }
		}
	}

	return (
		<>
			<Composition
				width={1920}
				height={1080}
				id="Full"
				fps={60}
				durationInFrames={duration || 60}
				component={Main}
			/>
			{items.map((x, i) => (
				<Composition
					key={i}
					id={`Music-${i + 1}`}
					component={MusicPlayer}
					durationInFrames={Math.ceil(
						(audioDatas[i]?.durationInSeconds || 1) * 60
					)}
					fps={60}
					width={1920}
					height={1080}
					defaultProps={x}
				/>
			))}
		</>
	)
}
