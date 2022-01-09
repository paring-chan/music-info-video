# Music Info Video

[Preview](https://youtu.be/7HVVB5LshTo)

## Usage

```shell
# clone repository
git clone https://github.com/pikokr/music-info-video
cd music-info-video

# install dependencies
yarn

# create config file
cp src/config.example.ts src/config.ts
```

## Preparing assets

First, prepare mp3 file and album image.

Then, put them on `src/assets` directory.

## Editing config file

```ts
export const items: Item[] = [
	{
		album: require('./assets/1/album.png'), // Album image location(used on album display and background)
		artist: 'Test', // The person(or people) who composed the music
		audio: require('./assets/1/audio.mp3'), // mp3 file location
		title: 'Test', // Music title
	},
]
```

## Building

```shell
yarn build
```
