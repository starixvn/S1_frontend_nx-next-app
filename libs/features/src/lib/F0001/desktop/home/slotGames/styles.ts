import styled from "styled-components";

export const GameGroup = styled.div`
	position: relative;
	padding-top: 4rem;
	padding-bottom: 4rem;

	.embla__viewport {
		position: relative;

		&:after {
			content: '';
			position: absolute;
			right: 0;
			top: 0;
			height: 100%;
			width: 8rem;
			background: linear-gradient(270deg, #0f1428 0%, rgba(15, 20, 40, 0) 100%);
		}
	}

	.embla__container {
		--largeGameWidth: 32rem;
		--min-width: 14rem;
		--min-height: 18.9rem;
		--gap: 2.4rem;
		--column-count: 6.5;
		--single-column-width: calc(
			((100% + var(--largeGameWidth)) - (var(--column-count) - 1) * var(--gap)) /
				var(--column-count)
		);

		display: grid;
		gap: var(--gap);
		grid-auto-flow: column;
		grid-auto-columns: var(--column-width, var(--single-column-width));
		padding-right: var(--largeGameWidth);
	}

	.embla__controls {
		position: absolute;
		top: 4rem;
		right: 0;
		grid-template-columns: auto;
		gap: 0.8rem;
		margin-top: 0;

		.embla__button {
			border-radius: 1rem;
			border: 2px solid ${({ theme }) => theme.desktop.carouselBtnBorder};
			background: ${({ theme }) => theme.desktop.carouselBtnBg};
			font-size: 2.4rem;

			&:disabled .icon:before {
				color: ${({ theme }) => theme.desktop.carouselBtnColorDisabled};
			}

			&:hover:not([disabled]) {
				border: 2px solid ${({ theme }) => theme.desktop.carouselBtnBorderHover};
				background: ${({ theme }) => theme.desktop.carouselBtnBgHover};

				.icon:before {
					color: ${({ theme }) => theme.desktop.carouselBtnColorHover};
				}
			}
		}
	}
`

export const GameContainer = styled.div`
	display: grid;
	grid-template-columns: 29.4rem 1fr;
	gap: 2.4rem;
	margin-top: 4rem;

	.game-large .game-icon {
		height: 100%;
	}
`
