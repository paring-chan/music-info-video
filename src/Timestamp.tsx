import React from 'react'
import {AudioData, useAudioData} from '@remotion/media-utils'
import {items} from './config'

const Timestamp: React.FC = () => {
	const audioDatas: (AudioData | null)[] = []

	let duration = 0

	for (const item of items) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const data = useAudioData(item.audio)
		audioDatas.push(data)

		if (data) {
			// if (audioDatas.length > 1) {
			// 	duration += 60;
			// }
		}
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor((time / 60 - minutes) * 60)
		const hours = Math.floor(minutes / 60)

		return `${
			hours > 0
				? hours.toLocaleString('en-US', {
						minimumIntegerDigits: 2,
				  }) + ':'
				: ''
		}${minutes.toLocaleString('en-US', {
			minimumIntegerDigits: 2,
		})}:${seconds.toLocaleString('en-US', {
			minimumIntegerDigits: 2,
		})}`
	}

	if (audioDatas.find((x) => !x)) return null

	return (
		<div
			style={{background: '#000', width: '100%', color: '#fff', fontSize: 40}}
		>
			{items.map((x, i) => {
				return (
					<div key={i}>
						{formatTime(duration)} -{' '}
						{formatTime(duration + (audioDatas[i]?.durationInSeconds || 1))}
						&nbsp;{x.artist} - {x.title}
						{(() => {
							duration += audioDatas[i]?.durationInSeconds || 1
							return null
						})()}
					</div>
				)
			})}
		</div>
	)
}

export default Timestamp
