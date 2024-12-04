import { GameGroup } from "@nx-next-app/features/F0001/h5/home/styles";
import styled from "styled-components";

export const GameContainer = styled.div`
	display: grid;
	gap: 2.4rem;
	margin-top: 4rem;
`
export const ProviderGroup = styled(GameGroup)`
	.embla__container {
		--column-count: 2.2;
		--largeGameWidth: 0;
		--slide-height: 18.9vw;
		--slide-size: 41.7vw;
		--single-column-width: 41.7vw;
	}

	.provider-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		background: #232b4f;
		width: var(--slide-size);

		.coming-soon {
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			border-radius: 2.4vw;
			background: rgba(55, 67, 117, 0.7);
			font-size: 2.9vw;
			font-weight: 700;
		}
	}

	.load-more {
		margin-right: 0 !important;
	}

	.img {
		height: 13.8vw;
		width: auto;
	}
`
