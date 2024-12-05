import styled from 'styled-components'

export const WrapperDepositPageHistoryH5 = styled.div`
	.quickSelect {
		display: flex;
		padding: 5vw 8vw;
		width: calc(100% - 16vw);
		border-bottom: 1px solid #374375;
		overflow: scroll;
		align-items: center;
		margin-top: 0;
	}
	.quickSelect + .functionList {
		padding: 2vw 4vw;
		width: calc(100% - 8vw);
		position: unset;
	}
	.quickSelect + .functionList .infoModule.parts {
		-ms-flex-flow: nowrap;
		flex-flow: nowrap;
	}
	.quickSelect + .functionList .infoModule.parts .inputBox,
	.quickSelect + .functionList .infoModule.parts .euro .inputBox-event,
	.euro .quickSelect + .functionList .infoModule.parts .inputBox-event,
	.quickSelect
		+ .functionList
		.infoModule.parts
		.worldcupEvent
		.event
		.event-content
		.inputBox-event,
	.worldcupEvent
		.event
		.event-content
		.quickSelect
		+ .functionList
		.infoModule.parts
		.inputBox-event {
		max-width: 28vw;
	}
	.quickSelect + .functionList .icon-icon32px_1 {
		margin: 0 0 0 1vw;
		color: #5574a7;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.quickSelect + .functionList .btn-group {
		margin: 0 0 0 1vw;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.quickSelect + .functionList .btn-group button {
		padding: 2.5vw;
		white-space: nowrap;
	}
	.quickSelect button {
		color: #a4a4a4;
		white-space: nowrap;
	}
	.quickSelect button:nth-child(n + 2) {
		margin: 0 0 0 5vw;
	}
	.quickSelect button.active {
		color: #112240;
	}
	.quickSelect .icon {
		position: fixed;
		right: 1vw;
		color: #112240;
	}
	.quickSelect .icon:before {
		font-size: 6vw;
	}
`
