import {Audio, Easing, interpolate, random, useCurrentFrame} from 'remotion'
import {useVideoConfig} from 'remotion'
import {useAudioData, visualizeAudio} from '@remotion/media-utils'
import React from 'react'
import {Item} from './typings'
import {background as globalBackground} from './config'
import _ from 'lodash'

export const MusicPlayer: React.FC<Item> = ({
	audio,
	album,
	background,
	title,
	artist,
	bgAnimation,
}) => {
	const frame = useCurrentFrame()
	const {fps, durationInFrames} = useVideoConfig()

	const audioData = useAudioData(audio)

	const posX = React.useRef(0)
	const posY = React.useRef(0)
	const posXSeed = React.useRef(100)
	const posYSeed = React.useRef(100)

	if (!audioData) return null

	const visualization = visualizeAudio({
		audioData,
		fps,
		numberOfSamples: 16,
		frame,
	})

	const opacity = interpolate(
		frame,
		[
			0,
			60,
			(durationInFrames > 60 ? durationInFrames : 121) - 60,
			durationInFrames > 60 ? durationInFrames : 62,
		],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	)

	// const bgMovementX = interpolate(frame,
	// 	new Array(durationInFrames / 60), [])

	const posYToChange = (random(`posy-${posYSeed.current}`) - 0.5) * 2

	if (
		(posY.current > 30 && posYToChange > 0) ||
		(posY.current < -30 && posYToChange < 0)
	) {
		posY.current = posY.current - posYToChange
		posYSeed.current++
	} else {
		posY.current = posY.current + posYToChange
	}

	const posXToChange = (random(`posx-${posXSeed.current}`) - 0.5) * 2

	if (
		(posX.current > 30 && posXToChange > 0) ||
		(posX.current < -30 && posXToChange < 0)
	) {
		posX.current = posX.current - posXToChange
		posXSeed.current++
	} else {
		posX.current = posX.current + posXToChange
	}

	console.log(posXToChange, posYToChange)

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				zIndex: 1000,
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					color: '#fff',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					opacity,
				}}
			>
				<div
					style={{
						display: 'flex',
						gap: 40,
						zIndex: 10,
					}}
				>
					<Audio src={audio} volume={() => 0.4} />
					<div>
						<div
							style={{
								width: 450,
								height: 450,
								background: `url(${album})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
						}}
					>
						<div style={{fontSize: 48, color: 'rgba(255, 255, 255, 0.5)'}}>
							{artist}
						</div>
						<div style={{fontSize: 64, fontWeight: 700}}>{title}</div>
						<div style={{flexGrow: 1}} />
						<div
							style={{
								height: 240,
								display: 'flex',
								alignItems: 'flex-end',
								gap: 10,
								justifyContent: 'space-between',
								width: 900,
							}}
						>
							{visualization.map((x, i) => (
								<div
									key={i}
									style={{
										width: 16,
										height: x > 1 ? 250 : 250 * x,
										background: '#fff',
										borderRadius: 16,
									}}
								/>
							))}
						</div>
						<div
							style={{
								height: 48,
								display: 'flex',
								alignItems: 'flex-end',
								gap: 10,
							}}
						>
							<div style={{fontSize: 28}}>
								{Math.floor(Math.floor(frame / 60) / 60)}:
								{(
									Math.floor(frame / 60) -
									Math.floor(Math.floor(frame / 60) / 60) * 60
								).toLocaleString('en-US', {
									minimumIntegerDigits: 2,
								})}
							</div>
							<div style={{position: 'relative', flexGrow: 1}}>
								<div
									style={{
										position: 'absolute',
										height: 16,
										background: '#fff',
										borderRadius: 16,
										width: `${(frame / durationInFrames) * 100}%`,
										bottom: 0,
										transform: 'translateY(-50%)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										height: 16,
										background: 'rgba(255, 255, 255, 0.1)',
										borderRadius: 16,
										width: '100%',
										bottom: 0,
										transform: 'translateY(-50%)',
									}}
								/>
							</div>

							<div style={{fontSize: 28}}>
								{Math.floor(Math.floor(audioData.durationInSeconds) / 60)}:
								{(
									Math.floor(audioData.durationInSeconds) -
									Math.floor(Math.floor(audioData.durationInSeconds) / 60) * 60
								).toLocaleString('en-US', {
									minimumIntegerDigits: 2,
								})}
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						width: 'calc(100% + 160px)',
						height: 'calc(100% + 160px)',
						position: 'fixed',
						left: -(160 / 2),
						top: -(160 / 2),
						transform: bgAnimation
							? `translateX(${posX.current}px) translateY(${posY.current}px)`
							: 'unset',
						...(globalBackground
							? {}
							: {
									backgroundImage: `url(${background ?? album})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
									filter: `blur(10px) brightness(0.7)`,
							  }),
					}}
				/>
			</div>
		</div>
	)
}
