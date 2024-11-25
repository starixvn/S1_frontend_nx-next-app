import { GameGroup } from '@nx-next-app/features/F0001/desktop/home/styles'
import styled from 'styled-components'

export const GameContainer = styled.div`
	display: grid;
	gap: 2.4rem;
	margin-top: 4rem;
`
export const ProviderGroup = styled(GameGroup)`
	.embla {
		width: ${({ theme }) => theme.desktop.contentWidth};
	}

	.embla__container {
		--column-count: 8.5;
		--largeGameWidth: 0;
		--slide-height: 7.8rem;
		--slide-size: 18rem;
	}

	.provider-item {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		background: #232b4f;
		width: var(--slide-size);
	}

	.load-more {
		margin-right: 0 !important;
	}
`
