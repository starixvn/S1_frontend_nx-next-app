import styled from "styled-components";

export const GameIconContainer = styled.div<{ isMaintain: boolean }>`
	position: relative;
	border-radius: 2rem;
	cursor: ${({ isMaintain }) => (isMaintain ? 'none' : 'pointer')};
	overflow: hidden;
	--game-icon-width: 14rem;
	--game-icon-height: 18.9rem;

	.img {
		width: var(--game-icon-width);
		height: var(--game-icon-height);
	}

	.btn-play {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%);
		z-index: 2;
		padding: 1rem 2.4rem;
	}

	.providerName {
		position: absolute;
		bottom: 0.4rem;
		text-align: center;
		width: 100%;
		line-height: 1.8rem;
		color: #fff;
		text-overflow: ellipsis;
		font-size: 1.2rem;
		font-weight: 400;
	}

	&:hover {
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
		}

		.btn-play {
			display: block;
		}
	}
`
