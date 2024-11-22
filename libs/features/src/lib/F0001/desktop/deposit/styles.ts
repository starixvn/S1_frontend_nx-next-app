import styled from 'styled-components'

export const WrapperDeposit = styled.div`
	.inside-title {
		justify-content: space-between;
		.group-icon-title {
			display: flex;
			gap: 1rem;
			align-items: center;
		}
		.btnGroup {
			margin-top: 0;
		}
	}
	.checkbox {
		&.autotransfer {
			display: flex;
			align-items: center;
			color: #939dc5;
		}
	}
	.block-deposit {
		.title {
			color: #939dc5;
		}
	}

	.subModuleTitle {
		color: #939dc5;
	}

	.swithModule {
		text-align: center;
		color: #112240 !important;
		font-size: 12px;
	}
	.swithModule .switchBtn {
		width: 60px;
		height: 28px;
		border: 1px solid #666;
		background: #666;
		border-radius: 28px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		position: relative;
		padding: 5px;
		margin: 5px;
	}
	.swithModule .switchBtn.active {
		background: #42ac5e;
		border-color: #42ac5e;
	}
	.swithModule .switchBtn.active > span:nth-child(2) {
		opacity: 0;
		-webkit-transition: 0.6s;
		transition: 0.6s;
	}
	.swithModule .switchBtn > span {
		color: white;
		font-size: 12px;
		font-weight: normal;
		margin: 0;
	}
	.swithModule .switchBtn > div {
		position: absolute;
		background: white;
		width: 26px;
		height: 26px;
		border-radius: 26px;
		left: 0;
		-webkit-transition: 0.6s;
		transition: 0.6s;
	}
	.swithModule .switchBtn > div.active {
		-webkit-transition: 0.6s;
		transition: 0.6s;
		left: calc(100% - 26px);
	}
	.swithModule .icon {
		color: #5574a7;
		font-size: 18px;
		font-weight: bold;
		margin-bottom: -2px;
	}
	.swithModule .icon:hover ~ .inputInfo.transfer {
		display: block;
	}
	.swithModule .inputInfo {
		display: none;
		background: #d2e2f9;
		border-radius: 5px;
		padding: 5px 10px;
		position: absolute;
		bottom: 40px;
		right: -5px;
		min-width: 500px;
		font-weight: 400;
		color: #5574a7;
		z-index: 4;
		-webkit-filter: drop-shadow(0px 0px 2px #5574a7);
		filter: drop-shadow(0px 0px 2px #5574a7);
	}
	.swithModule .inputInfo.active {
		display: block;
	}
	.swithModule .inputInfo:before {
		content: '';
		width: 0;
		height: 0;
		border-width: 10px 10px 0 10px;
		border-style: solid dashed dashed;
		border-color: #d2e2f9 transparent transparent;
		position: absolute;
		bottom: -10px;
		right: 10px;
		z-index: 1;
	}
	.swithModule .inputInfo span {
		display: block;
		font-size: 14px;
		font-weight: bold;
		color: #cf0404;
		margin: 0 auto;
	}
	.swithModule .inputInfo .btnGroup button {
		padding: 5px 0;
		-webkit-box-flex: 0;
		-ms-flex: 0 0 80px;
		flex: 0 0 80px;
	}
	.subModuleTitle {
		color: #112240;
		font-weight: bold;
		margin-bottom: 10px;
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.subModuleTitle .info {
		margin-left: 5px;
		color: rgba(247, 121, 0, 0.9);
		font-weight: normal;
		font-size: 13px;
	}
	.subModuleTitle .txt-blue {
		color: #f77900;
	}
	.subModuleTitle .autotransfer {
		right: 0;
	}
	.subModuleTitle .autotransfer .swithModule {
		position: unset;
	}
	.subModuleTitle .autotransfer .icon-question {
		font-weight: normal;
		font-size: 18px;
		color: #5574a7;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.subModuleTitle .autotransfer .icon-question + .inputInfo {
		display: none;
		background: #d2e2f9;
		border-radius: 5px;
		padding: 5px 10px;
		position: absolute;
		bottom: 30px;
		right: -5px;
		min-width: 500px;
		font-weight: normal;
	}
	.subModuleTitle .autotransfer .icon-question + .inputInfo:before {
		content: '';
		width: 0;
		height: 0;
		border-width: 10px 10px 0 10px;
		border-style: solid dashed dashed;
		border-color: #d2e2f9 transparent transparent;
		position: absolute;
		bottom: -10px;
		right: 10px;
		z-index: 1;
	}
	.subModuleTitle .autotransfer .icon-question + .inputInfo.active {
		display: block;
	}
`
