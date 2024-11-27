import styled from "styled-components";

export const LiveCasinoContainer = styled.div`
	position: relative;
	overflow: hidden;

	&:before,
	&:after {
		content: '';
		position: absolute;
	}

	&:before {
		top: 10.4rem;
		left: -7rem;
		width: 22.5rem;
		height: 22.4rem;
		background: url(${({ theme }) =>
				theme.assetUrl}/desktop/img/new-ui/decor-1.webp)
			no-repeat;
	}

	&:after {
		bottom: -3rem;
		right: -13rem;
		width: 33.7rem;
		height: 33.7rem;
		background: url(${({ theme }) =>
				theme.assetUrl}/desktop/img/new-ui/decor-2.webp)
			no-repeat;
	}

	.embla {
		position: relative;
		z-index: 2;
	}
`
