import styled from "styled-components";

export const SportContainer = styled.div`
	position: relative;

	&:before {
		content: '';
		position: absolute;
		top: 20rem;
		left: -8.8rem;
		width: 27.6rem;
		height: 27.7rem;
		background: url(${({ theme }) =>
				theme.assetUrl}/desktop/img/new-ui/decor-3.webp?v=2)
			no-repeat;
	}

	.embla {
		position: relative;
		z-index: 2;
	}
`
