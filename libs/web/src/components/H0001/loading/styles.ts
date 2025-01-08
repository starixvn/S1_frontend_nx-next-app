import styled from 'styled-components'

export const LoadingContainer = styled.div`
	width: calc(100% - 16vw);
	height: calc(100% - 16vw);
	position: fixed;
	top: 0;
	left: 0;
	display: none;
	z-index: 9999;

	&.active {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.container {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-flow: row;
		flex-flow: row;
		margin: 0 auto;
		width: 50%;
	}
	@-webkit-keyframes rotate {
		0% {
			-webkit-transform: rotateX(-37.5deg) rotateY(45deg);
			transform: rotateX(-37.5deg) rotateY(45deg);
		}
		50% {
			-webkit-transform: rotateX(-37.5deg) rotateY(405deg);
			transform: rotateX(-37.5deg) rotateY(405deg);
		}
		100% {
			-webkit-transform: rotateX(-37.5deg) rotateY(405deg);
			transform: rotateX(-37.5deg) rotateY(405deg);
		}
	}
	@keyframes rotate {
		0% {
			-webkit-transform: rotateX(-37.5deg) rotateY(45deg);
			transform: rotateX(-37.5deg) rotateY(45deg);
		}
		50% {
			-webkit-transform: rotateX(-37.5deg) rotateY(405deg);
			transform: rotateX(-37.5deg) rotateY(405deg);
		}
		100% {
			-webkit-transform: rotateX(-37.5deg) rotateY(405deg);
			transform: rotateX(-37.5deg) rotateY(405deg);
		}
	}
	.cube,
	.cube * {
		position: absolute;
		width: 16vw;
		height: 16vw;
		z-index: 1;
	}
	.sides {
		-webkit-animation: rotate 3s ease infinite;
		animation: rotate 3s ease infinite;
		-webkit-animation-delay: 0.8s;
		animation-delay: 0.8s;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transform: rotateX(-37.5deg) rotateY(45deg);
		transform: rotateX(-37.5deg) rotateY(45deg);
	}
	.cube .sides * {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		background-color: rgba(85, 116, 167, 0.1);
		border: 1px solid #5574a7;
	}
	.cube .sides .top {
		-webkit-animation: top-animation 3s ease infinite;
		animation: top-animation 3s ease infinite;
		-webkit-animation-delay: 0ms;
		animation-delay: 0ms;
		-webkit-transform: rotateX(90deg) translateZ(16vw);
		transform: rotateX(90deg) translateZ(16vw);
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
	}
	@-webkit-keyframes top-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(16vw);
			transform: rotateX(90deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(8vw);
			transform: rotateX(90deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(8vw);
			transform: rotateX(90deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(16vw);
			transform: rotateX(90deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(16vw);
			transform: rotateX(90deg) translateZ(16vw);
		}
	}
	@keyframes top-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(16vw);
			transform: rotateX(90deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(8vw);
			transform: rotateX(90deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(8vw);
			transform: rotateX(90deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(16vw);
			transform: rotateX(90deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateX(90deg) translateZ(16vw);
			transform: rotateX(90deg) translateZ(16vw);
		}
	}
	.cube .sides .bottom {
		-webkit-animation: bottom-animation 3s ease infinite;
		animation: bottom-animation 3s ease infinite;
		-webkit-animation-delay: 0ms;
		animation-delay: 0ms;
		-webkit-transform: rotateX(-90deg) translateZ(16vw);
		transform: rotateX(-90deg) translateZ(16vw);
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
	}
	@-webkit-keyframes bottom-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(16vw);
			transform: rotateX(-90deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(8vw);
			transform: rotateX(-90deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(8vw);
			transform: rotateX(-90deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(16vw);
			transform: rotateX(-90deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(16vw);
			transform: rotateX(-90deg) translateZ(16vw);
		}
	}
	@keyframes bottom-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(16vw);
			transform: rotateX(-90deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(8vw);
			transform: rotateX(-90deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(8vw);
			transform: rotateX(-90deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(16vw);
			transform: rotateX(-90deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateX(-90deg) translateZ(16vw);
			transform: rotateX(-90deg) translateZ(16vw);
		}
	}
	.cube .sides .front {
		-webkit-animation: front-animation 3s ease infinite;
		animation: front-animation 3s ease infinite;
		-webkit-animation-delay: 100ms;
		animation-delay: 100ms;
		-webkit-transform: rotateY(0deg) translateZ(16vw);
		transform: rotateY(0deg) translateZ(16vw);
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
	}
	@-webkit-keyframes front-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(16vw);
			transform: rotateY(0deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(8vw);
			transform: rotateY(0deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(8vw);
			transform: rotateY(0deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(16vw);
			transform: rotateY(0deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(16vw);
			transform: rotateY(0deg) translateZ(16vw);
		}
	}
	@keyframes front-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(16vw);
			transform: rotateY(0deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(8vw);
			transform: rotateY(0deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(8vw);
			transform: rotateY(0deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(16vw);
			transform: rotateY(0deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateY(0deg) translateZ(16vw);
			transform: rotateY(0deg) translateZ(16vw);
		}
	}
	.cube .sides .back {
		-webkit-animation: back-animation 3s ease infinite;
		animation: back-animation 3s ease infinite;
		-webkit-animation-delay: 100ms;
		animation-delay: 100ms;
		-webkit-transform: rotateY(-180deg) translateZ(16vw);
		transform: rotateY(-180deg) translateZ(16vw);
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
	}
	@-webkit-keyframes back-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(16vw);
			transform: rotateY(-180deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(8vw);
			transform: rotateY(-180deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(8vw);
			transform: rotateY(-180deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(16vw);
			transform: rotateY(-180deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(16vw);
			transform: rotateY(-180deg) translateZ(16vw);
		}
	}
	@keyframes back-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(16vw);
			transform: rotateY(-180deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(8vw);
			transform: rotateY(-180deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(8vw);
			transform: rotateY(-180deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(16vw);
			transform: rotateY(-180deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateY(-180deg) translateZ(16vw);
			transform: rotateY(-180deg) translateZ(16vw);
		}
	}
	.cube .sides .left {
		-webkit-animation: left-animation 3s ease infinite;
		animation: left-animation 3s ease infinite;
		-webkit-animation-delay: 100ms;
		animation-delay: 100ms;
		-webkit-transform: rotateY(-90deg) translateZ(16vw);
		transform: rotateY(-90deg) translateZ(16vw);
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
	}
	@-webkit-keyframes left-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(16vw);
			transform: rotateY(-90deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(8vw);
			transform: rotateY(-90deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(8vw);
			transform: rotateY(-90deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(16vw);
			transform: rotateY(-90deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(16vw);
			transform: rotateY(-90deg) translateZ(16vw);
		}
	}
	@keyframes left-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(16vw);
			transform: rotateY(-90deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(8vw);
			transform: rotateY(-90deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(8vw);
			transform: rotateY(-90deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(16vw);
			transform: rotateY(-90deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateY(-90deg) translateZ(16vw);
			transform: rotateY(-90deg) translateZ(16vw);
		}
	}
	.cube .sides .right {
		-webkit-animation: right-animation 3s ease infinite;
		animation: right-animation 3s ease infinite;
		-webkit-animation-delay: 100ms;
		animation-delay: 100ms;
		-webkit-transform: rotateY(90deg) translateZ(16vw);
		transform: rotateY(90deg) translateZ(16vw);
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
	}
	@-webkit-keyframes right-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(16vw);
			transform: rotateY(90deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(8vw);
			transform: rotateY(90deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(8vw);
			transform: rotateY(90deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(16vw);
			transform: rotateY(90deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(16vw);
			transform: rotateY(90deg) translateZ(16vw);
		}
	}
	@keyframes right-animation {
		0% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(16vw);
			transform: rotateY(90deg) translateZ(16vw);
		}
		20% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(8vw);
			transform: rotateY(90deg) translateZ(8vw);
		}
		70% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(8vw);
			transform: rotateY(90deg) translateZ(8vw);
		}
		90% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(16vw);
			transform: rotateY(90deg) translateZ(16vw);
		}
		100% {
			opacity: 1;
			-webkit-transform: rotateY(90deg) translateZ(16vw);
			transform: rotateY(90deg) translateZ(16vw);
		}
	}
	h1 {
		-webkit-transform: rotateX(-37.5deg) rotateY(45deg);
		transform: rotateX(-37.5deg) rotateY(45deg);
		-webkit-animation: rotate 3s ease infinite;
		animation: rotate 3s ease infinite;
		-webkit-animation-delay: 0.8s;
		animation-delay: 0.8s;
	}
	h1:after {
		font-size: 4vw;
		font-weight: bold;
		content: '';
		position: absolute;
		color: rgb(255, 255, 255);
		-webkit-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
		text-shadow: -1px -1px 1px #333, -2px -2px 1px #333, -3px -3px 1px #333,
			-4px -4px 1px #333, -5px -5px 1px #333, -6px -6px 1px #333,
			-7px -7px 5px rgba(0, 0, 128, 0.75);
	}
	.text {
		width: 100%;
		position: absolute;
		-webkit-transform: translateY(25vw);
		transform: translateY(25vw);
		font-size: 4vw;
		text-align: center;
		color: #5574a7;
	}
`
