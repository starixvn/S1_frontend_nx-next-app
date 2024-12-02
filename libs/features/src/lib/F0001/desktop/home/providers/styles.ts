import { GameGroup } from "@nx-next-app/features/F0001/desktop/home/styles";
import styled from "styled-components";

export const GameContainer = styled.div`
	display: grid;
	gap: 2.4rem;
	margin-top: 4rem;
`
export const ProviderGroup = styled(GameGroup)`
	.embla {
		width: ${({ theme }) => theme.desktop.minContentWidth};

		@media (min-width: 1450px) {
			width: ${({ theme }) => theme.desktop.contentWidth};
		}
	}

	.embla__container {
		--column-count: 8.5;
		--largeGameWidth: 0;
		--slide-height: 7.8rem;
		--slide-size: 18rem;
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
			border-radius: 1rem;
			background: rgba(55, 67, 117, 0.7);
			font-size: 1.2rem;
			font-weight: 700;
		}
	}

	.load-more {
		margin-right: 0 !important;
	}

	.img {
		height: 6.5rem;
		width: auto;
	}
`
