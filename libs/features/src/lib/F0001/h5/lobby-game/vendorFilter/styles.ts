import styled from "styled-components";

export const VendorFilterContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 3.88vw;
	width: 100%;

	.provider-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.8vw;
		flex: 0 0 calc((100% - 7.76vw) / 3);
		height: 18.92vw;
		background: #1d2447;
		border-radius: 2.42vw;
		color: #fff;
		font-size: 2.9vw;
		font-weight: 700;

		.img-container {
			width: 8.7vw;
			height: 8.7vw;
			border-radius: 50%;
			background: #dcdee9;
		}

		&.active {
			background: linear-gradient(0deg, #717fba 0%, #a2afe5 100%);
			color: white;
		}
	}

	.provider-name {
		line-height: 1;
		text-align: center;
		font-size: 2.91vw;
		font-weight: 700;
	}
`
