import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  /* Reset UI */
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul,li {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote {
    &:before, &:after {
      content: '';
      content: none;
    }
  }

  q {
    &:before, &:after {
      content: '';
      content: none;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button{
    background: transparent;
    border: none;
    padding:0;
    outline:none;
    cursor: pointer;
    font-family: ${({ theme }) => theme.desktop.fontFamily};
  }

  pre{
    white-space: break-spaces;
  }

  a{
    text-decoration: none;
    color: #5574A7;
    cursor: pointer;
  }

  img{
    width:100%;
    display: block;
    height: auto;
  }

  /* Common Class */

  .block {
    display: block
  }

  .inline-block {
      display: inline-block
  }

  .inline {
      display: inline
  }

  .flex {
      display: flex
  }

  .inline-flex {
      display: inline-flex
  }

  .flex-auto {
      flex: 1 1 auto
  }

  .grid {
      display: grid
  }

  .flex-auto {
      flex: 1 1 auto
  }

  html {
    font-size: 10px !important;
  }

  body, main {
    background: ${theme.desktop.primary};
    font-size: 1.4rem;
  }

  #__next {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  .main-content {
    min-width: ${({ theme }) => theme.desktop.contentWidth};
  }

  .content-container {
    width:${({ theme }) => theme.desktop.contentWidth};
    margin-left: auto;
    margin-right: auto;
  }

  #popup {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 99;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    &::-webkit-scrollbar-track{
        background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-thumb{
      background: rgba(125, 125, 125, 0.7);
    }
    &.active{
      display : flex;

    }
    .pop{
      border-radius: 20px;
      max-height: calc(100% - 160px);
      box-shadow: ${theme.desktop.popupBoxShadow};
      background : ${theme.desktop.popupBg};
      position : relative;
      .close-popup{
        position : absolute;
        cursor: pointer;
        top: 20px;
        right: 20px;
        &:before{
          font-size : 2.4rem;
        }
      }
      .icon-notifi{
        border-radius: 100px;
        border: 6px solid ${theme.desktop.borderIconNotifiCationColor};
        background: ${theme.desktop.bgIconNotifiCationColor};
        width : 4.8rem;
        height : 4.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom : 2.4rem;
        &:before{
          font-size : 3.2rem;
          color : ${theme.desktop.iconNotifiCationColor}
        }
      }
      .notifi-content{
        margin-top : 1.6rem;
        > div {
          font-size: 1.4rem;
          font-style: normal;
          font-weight: 400;
          text-align : center;
          margin-bottom : .5rem;
          line-height: 1.8rem;
          &:last-child{
            margin-bottom : 0;
          }
         }
      }
      .title{
        color: ${({ theme }) => theme.desktop.white};
        font-size: 1.7rem;
        font-weight: 700;
        line-height: normal;
        margin-bottom : .8rem;
      }
      .error-content{
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.8rem;
      }
      .Success, ,poker,
      .duitnowPop,
      .angpaopop,
      .friend,
      .Cancel,
      .uploadSuccess,
      .updateSuccess,
      .Success,
      .tokyc,
      .addBankpop,
      .addAddresspop,
      .changePassWordpop,
      .editSuccess,
      .joinSuccess,
      .resetPassWordpop,
      .noticepop,.statuspop{
        min-width: 40rem;
        padding: 4rem 2.8rem 2.8rem 2.8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .btnGroup{
          margin-top : 2.4rem;
          min-width : 20rem;
          button{
             width: 100%;
          }
        }
      }
    }
  }
  .promoInfoPop{
    max-height: calc(100% - 160px);
    overflow-y: auto;
    box-shadow: ${theme.desktop.popupBoxShadow};
    background : ${theme.desktop.popupBg};
    position : relative;
    width: 80rem;
    padding: 4rem 2.8rem 2.8rem 2.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    .btnGroup{
      margin-top : 2.4rem;
      min-width : 20rem;
      button{
          width: 100%;
      }
    }
    .icon-close,.icon-close-line{
      position: absolute;
      top: 10px;
      right: 20px;
      &:before{
        font-size : 2rem;
      }
    }
  }
  .tip {
    margin-top: 0.4rem;
    padding: 0;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme }) => theme.desktop.tipColor};
  }
  .inputModule {
    margin-top: 0;
    .inputBox-row {
      display: flex;
      gap: 1.6rem;
      .inputBox-blue {
        width: 50%;
      }
    }
  }
  .inputBox-blue {
    min-height: 3.6rem;
    padding: 0 1.2rem;
    border-radius: 100px;
    background: ${({ theme }) => theme.desktop.inputBg};
    border: none;
    margin-top: 1.6rem;
    display: flex;
    align-items: center;
    position: relative;
    .icon {
      height: 2rem;
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &:before {
        color: ${({ theme }) => theme.desktop.white};
        font-size: 1.8rem;
        margin: 0;
      }
    }
    .dropdown {
      .btn {
        color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
      }
    }
    &.error {
      border: 1px solid
        ${({ theme }) => theme.desktop.inputBorderColorError};
    }
    &.error + .tip {
      color: ${({ theme }) => theme.desktop.tipColorError} !important;
    }
  }
  .txt-red{
    color: ${({ theme }) => theme.desktop.tipColorError} !important;
  }

  .error-msg{
    color: ${({ theme }) => theme.desktop.tipColorError}
  }
  .txt-required{
    color: ${({ theme }) => theme.desktop.hrefColorPrimary}
  }

  .react-datepicker__input-container{
    input{
      width : 88% !important;
      font-size : 1.4rem;
      color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
      &::placeholder {
        font-size : 1.4rem;
      }
    }
  }
  .react-datepicker-popper[data-placement^=bottom]{
    padding-top : 1.5rem;
  }
  .react-datepicker{
    border-radius: 20px;
    background: ${({ theme }) => theme.desktop.datePickerHeaderBg};
    box-shadow: ${({ theme }) => theme.desktop.datePickerBoxShadow};
    border : none;
    min-width: 26.8rem;
    overflow: hidden;
    padding : 1.6rem;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &__header{
      background: ${({ theme }) => theme.desktop.datePickerHeaderBg};
      width : 100%;
      border : none;
      padding : 0;
      > div{
        justify-content: space-between !important;
        gap : .5rem;
        margin : 0;
        display: flex;
        select {
          outline : none;
          width : 50%;
          height : 24px;
          background : #1D2447;
          border : none;
          border-radius : 20px;
          padding : .2rem .5rem;
          color : ${({ theme }) => theme.desktop.white};
        }
        button{
          color : ${({ theme }) => theme.desktop.white} !important;
        }
      }
    }
    &__day-names{
      color : ${({ theme }) => theme.desktop.white};
      margin-top : 1.2rem;
    }
    &__month-container{
      float : none;
    }
    &__month{
      margin : .8rem 0;
    }
    &__week{
      display: flex;
    justify-content: space-between;
    }
    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name{
      width: 3rem;
      line-height: 3rem;
      color : ${({ theme }) => theme.desktop.white};
      font-size: 1.3rem !important;
      font-weight: 400;
      &:hover{
        background :#717FBA;
      }
    }
    &__day{
      &--in-range,&--in-selecting-range{
         background :#717FBA;
         &:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range){
          opacity : .7; 
          background :${({ theme }) => theme.desktop.datePickerSelectRangeBg};
         }
      }
      &--selected{
        background :transparent;
        color : ${({ theme }) =>
					theme.desktop.datePickerSelectColor} !important;
      }
    }
  }
  
  input {
    color: ${({ theme }) => theme.desktop.inputColor};
    background: ${({ theme }) => theme.desktop.inputBg};
    padding-left: 1rem;
    font-family: ${({ theme }) => theme.desktop.fontFamily};
    outline : none;
    box-shadow : none;
    border: none;
    width: 100%;
    &::placeholder {
      color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
      font-size : 1.4rem;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px ${({ theme }) =>
				theme.desktop.inputBg} inset !important;
      -webkit-text-fill-color: #ffffff;
  }
  .wrapper-profile {
    display: flex;
    max-width: ${({ theme }) => theme.desktop.contentWidth};
    margin: 0 auto;
    padding: 4rem 1.6rem 4rem;
    gap : 2.4rem;
    #leftMenu {
      flex : 0 0 18%;
    }
    .rightModule{
      flex : 1;
      .infoModule{
        background: ${({ theme }) => theme.desktop.rightModuleBg};
        border-radius : 20px;
        .inside-title{
          border-bottom : 1px solid ${({ theme }) =>
						theme.desktop.rightModuleBorderColor};
          min-height : 5.2rem;
          display: flex;
          align-items: center;
          padding: 0 1.6rem;
          text-transform: uppercase;
          gap : .5rem;
          .icon {
            &:before{
              font-size : 2.4rem;
              margin : 0;
            }
          }
        }
        .inside-body{
          padding : 2.4rem 1.6rem;
          .txt-blue {
            white-space: nowrap;
            color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
            font-weight : 400;
          }
        }
      }
    }
  }

  .btnGroup {
    display: flex;
    gap: 1.6rem;
    margin-top: 1.6rem;
    button {
      border-radius: 100px;
      min-height: 3.6rem;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: normal;
      color: ${({ theme }) => theme.desktop.white};
      width: 100%;
      padding : 0 2.4rem;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
    }
      a{
        border-radius: 100px;
        min-height: 3.6rem;
        font-size: 1.4rem;
        font-weight: 600;
        line-height: normal;
        color: ${({ theme }) => theme.desktop.white};
        width: 100%;
        padding : 0 1.2rem;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    .custom-btn-title{
      min-height : 2.8rem;
      span{
        margin-left: .4rem;
        text-transform: capitalize;
      }
    }
  }
  .profile-unset-overflow{
    overflow : unset !important;
  }

  .heading-form {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: normal;
    color: ${({ theme }) => theme.desktop.white};
    margin-bottom: 1.6rem;
  }

  .button {
    display: flex;
		gap: 1rem;
    justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		min-width: 6.2rem;
		height: 3.6rem;
		padding: 0 1.2rem;
		border-radius: 10rem;
  }
  .custom-nodata{
    min-height : 10rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2.4rem;
    justify-content: center;
    padding-top: 1.6rem;
		margin-top: 1.6rem;
		border-top: 1px solid #374375;
    .icon {
      border-radius: 100px;
      border: 6px solid ${({ theme }) => theme.desktop.bgIconNotifiCationColor};
      background:  ${({ theme }) => theme.desktop.hoverAddBankName};
      width : 4.8rem;
      height : 4.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:before{
        font-size : 3.2rem;
      }
    }
    > div{
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.8rem;
      color :  ${({ theme }) => theme.desktop.iconNotifiCationColor}
    }
    &.no-border{
      margin-top: 0;
      padding-top: 0;
      border-top: 0;
    }
  }

  .btn-primary {
		background: ${({ theme }) => theme.desktop.primaryBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.primaryBtnShadow};
		color: ${({ theme }) => theme.desktop.primaryBtnColor};

		&:hover {
			background: ${({ theme }) => theme.desktop.primaryBtnBgHover};
      box-shadow: ${({ theme }) => theme.desktop.primaryBtnShadowHover};
		color: ${({ theme }) => theme.desktop.primaryBtnColorHover};
		}
	}

  .btn-secondary {
		background: ${({ theme }) => theme.desktop.secondaryBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.secondaryBtnShadow};
		color: ${({ theme }) => theme.desktop.secondaryBtnColor};

		&:hover {
    background: ${({ theme }) => theme.desktop.secondaryBtnBgHover};
		box-shadow: ${({ theme }) => theme.desktop.secondaryBtnShadowHover};
		color: ${({ theme }) => theme.desktop.secondaryBtnColorHover};
		}
	}
  .btn-tabs {
      background: ${({ theme }) => theme.desktop.tabsBtnBg};
      color: ${({ theme }) => theme.desktop.tabsBtnColor} !important;
      min-height: 2.8rem !important;
      padding : 0 1.2rem !important;
		&:hover {
      background: ${({ theme }) => theme.desktop.tabsBtnHoverBg};
      color: ${({ theme }) => theme.desktop.tabsBtnHoverColor} !important;
		}
    &.active{
      background: ${({ theme }) => theme.desktop.tabsBtnHoverBg};
      color: ${({ theme }) => theme.desktop.tabsBtnHoverColor} !important;
    }
  }

  .btn-disable {
    cursor: no-drop;
    background: ${({ theme }) => theme.desktop.disabledBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.disabledBtnShadow};
		color: ${({ theme }) => theme.desktop.disabledBtnColor} !important;
  }

  .custom-tooltip{
    position : relative;
    &-body{
      display : none;
      font-family: ${({ theme }) => theme.desktop.fontFamily};
      position: absolute;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.desktop.tooltipBorderColor};
      background: ${({ theme }) => theme.desktop.tooltipBgColor};
      box-shadow: ${({ theme }) => theme.desktop.tooltipBoxShadow};
      z-index : 1;
      top: 100%;
      min-width : 28.4rem;
      margin-top : 1rem;
    }
    &:hover{
      .custom-tooltip-body{
        display: block;
        > div {
          display: block;
          text-align : center;
          font-size: 1.2rem;
          font-weight: 400;
          line-height: 1.8rem;
          color : ${({ theme }) => theme.desktop.tooltipColor};
          &.title{
            margin-bottom : .8rem;
            font-weight: 700;
          }
        }
      }
    }
  }

  .custom-tooltip-click {
    position : relative;
    &-body{
      display : none;
      font-family: ${({ theme }) => theme.desktop.fontFamily};
      position: absolute;
      padding: 1.2rem;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.desktop.tooltipBorderColor};
      background: ${({ theme }) => theme.desktop.tooltipBgColor};
      box-shadow: ${({ theme }) => theme.desktop.tooltipBoxShadow};
      z-index : 1;
      top: 100%;
      min-width : 28.4rem;
      margin-top : 1rem;
      right : 0;
      font-size : 1.2rem;
      color : ${({ theme }) => theme.desktop.tooltipColor};
      line-height: 1.8rem;
      &.active{
        display : block;
      }
    }

  }

  .dropdown {
		width: 100%;
		display: flex;
		align-items: center;
		flex-flow: wrap;
		.btn {
			width: 70%;
			text-align: left;
			margin-left: 0.8rem;
			font-family: ${({ theme }) => theme.desktop.fontFamily};
			color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
			&:before {
				font-family: 'S1NewIcons';
				content: '\\e925';
				position: absolute;
				right: 15px;
				top: 8px;
				font-size: 2rem;
				color: ${({ theme }) => theme.desktop.white};
			}
		}
		.dropdown-item {
			border-top: 1px solid
				${({ theme }) => theme.desktop.registerDropdownBorderColor};
			min-height: 4.2rem;
			cursor: pointer;
			display: flex;
			align-items: center;
			padding: 0 2.4rem;
			color: ${({ theme }) => theme.desktop.registerInputDropDownColor};
			font-size: 1.4rem;
			font-weight: 600;
			line-height: normal;
			&:first-child {
				border-top: none;
			}
			&:hover {
				color: ${({ theme }) => theme.desktop.registerInputDropDownColorHover};
			}
		}
		.dropdown-container {
			box-shadow: ${({ theme }) => theme.desktop.registerInputDropDownShadow};
			position: absolute;
			top: 40px;
			left: 0;
			border-radius: 20px;
			background: ${({ theme }) => theme.desktop.registerDropdownBg};
			overflow: hidden;
			z-index: 2;
      display : none;
      width: 100%;
      &.active{
        display : block;
      }
			.heading-search {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 1.3rem 1.6rem;
				border-bottom: 1px solid
					${({ theme }) => theme.desktop.registerDropdownBorderColor};
				.group-search {
					position: relative;
					input {
						min-height: 3.6rem;
						border-radius: 100px;
						padding: 0 1.2rem;
            width : auto;
					}
					.icon-search {
						position: absolute;
						top: 7px;
						right: 12px;
					}
				}
			}
			.dropdown-wrapper {
				overflow-x: hidden;
				max-height: 31.6rem;
				&::-webkit-scrollbar-track {
					background: transparent;
				}
				&::-webkit-scrollbar-thumb {
					border-radius: 15px;
				}
			}
		}
	}
    .swithModule {
		.switchBtn {
			width: 4rem;
			height: 2rem;
			background: ${({ theme }) => theme.desktop.switchBgOff};
			border-radius: 2.8rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			padding: 0.5rem;
			> div {
				position: absolute;
				background: ${({ theme }) => theme.desktop.white};
				width: 2rem;
				height: 2rem;
				left: 0;
				transition: 0.6s;
				border-radius: 26px;
				&.active {
					transition: 0.6s;
					left: calc(100% - 2rem);
				}
			}
			&.active {
				background: ${({ theme }) => theme.desktop.switchBgOn};
				> span {
					margin: 0;
					&:nth-child(2) {
						opacity: 0;
						transition: 0.6s;
					}
				}
			}
		}
	}
  .custom-table{
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.desktop.customTableBorderColor};
    overflow: hidden;
    display: grid;
    .icon{
      &:before{
        color : #939DC5;
      }
    }
    &-thead{
      display: flex;
      background: ${({ theme }) => theme.desktop.customTableTheadBg};
      .custom-th{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding : 1.8rem .8rem;
        text-align :center;
        border-right: 1px solid ${({ theme }) =>
					theme.desktop.customTableBorderColor};
        border-bottom: 1px solid ${({ theme }) =>
					theme.desktop.customTableBorderColor};
        font-size: 1.4rem;
        font-weight: 700;
        line-height: normal;
        &:first-child{
          width : 30%;
        }
        &:last-child{
          border-right : none;

        }
      }
    }
    &-tbody{
      background : ${({ theme }) => theme.desktop.customTableTbodyBg};
      font-size: 1.4rem;
      font-weight: 600;
      line-height: normal;
      color : #939DC5;
      .custom-td{
        display: flex;
        &:last-child{
          .td{
            border-bottom : none;
          }
        }
        .td{
          width: 100%;
          text-align : center;
          padding : 1.8rem .8rem;
          border-right: 1px solid ${({ theme }) =>
						theme.desktop.customTableBorderColor};
          border-bottom: 1px solid ${({ theme }) =>
						theme.desktop.customTableBorderColor};
          display: inline-block !important;
          white-space: nowrap;
          overflow: hidden !important;
          text-overflow: ellipsis;
          &:first-child{
            width : 30%;
          }
          &:last-child{
            border-right : none;
          }
        }
      }
    }
    .pending,.approved,.reject,.cancel{
      font-size: 1.2rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      padding : .4rem 1.2rem;
      border-radius: 100px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      .infobtn{
        &:before{
          font-family: 'S1NewIcons';
          display : block;
          content : '\\e910';
          font-size : 1.5rem;
          color : #fff;
        }
      }
    }
    .pending{
      color :  ${({ theme }) => theme.desktop.tableStatusPenddingColor};
      border : 1px solid ${({ theme }) =>
				theme.desktop.tableStatusPenddingColor};
      .infobtn{
        &:before{
          color :  ${({ theme }) => theme.desktop.tableStatusPenddingColor};
        }
      }
    }
    .approved{
      color :  ${({ theme }) => theme.desktop.tableStatusApprovedColor};
      border : 1px solid ${({ theme }) =>
				theme.desktop.tableStatusApprovedColor};
      .infobtn{
        &:before{
          color :  ${({ theme }) => theme.desktop.tableStatusApprovedColor};
        }
      }
    }
    .reject{
      color :  ${({ theme }) => theme.desktop.tableStatusRejetctColor};
      border : 1px solid ${({ theme }) =>
				theme.desktop.tableStatusRejetctColor};
      .infobtn{
        &:before{
          color :  ${({ theme }) => theme.desktop.tableStatusRejetctColor};
        }
      }
    }
    .cancel{
      color :  ${({ theme }) => theme.desktop.tableStatusCancelColor};
      border : 1px solid ${({ theme }) => theme.desktop.tableStatusCancelColor};
      .infobtn{
        &:before{
          color :  ${({ theme }) => theme.desktop.tableStatusCancelColor};
        }
      }
    }
    .btnGroup{
      flex-wrap: wrap;
      justify-content: center;
      margin-top : 0;
      .btn{
        width : max-content;
      }
    }
    .txt-blue{
      color: #374375 !important;
      font-size: 1.4rem;
      font-weight: 600 !important;
      line-height: normal;
      margin-left : .8rem;
    }
    .total{
      padding : 2rem 1.6rem;
      color :  ${({ theme }) => theme.desktop.white};
      background : #232B4F;
      font-size: 1.4rem;
      font-weight: 700;
      line-height: normal;
      .line{
        color : #374375;
        margin : 0 1.6rem;
      }
    }
  }
  .pagination{
    gap : .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top : 1.6rem;
    li{
      a{
      width : 3.2rem;
      height : 3.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      color : ${({ theme }) => theme.desktop.paginationColor};
        &.active, &:hover{
          background : ${({ theme }) => theme.desktop.paginationBg};
          color : ${({ theme }) => theme.desktop.white};
        }
      }
    }
  }
  .checkbox{
    label {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    input[type=checkbox]{
      display : none;
    }
    input[type=checkbox]:checked + label.icon:before{
      display : block;
      content : '\\e91c'
    }
  }
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

  nav.breadcrumb ul {
    display: flex;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: normal;
    .breadcrumb-item{
      display: flex;
      align-items: center;
      a {
       color : ${({ theme }) => theme.desktop.bradcumbColor};
        text-transform: capitalize;
      }
    }
    .breadcrumb-item + .breadcrumb-item::before{
      content: '\\e923';
      font-family: 'S1NewIcons';
      margin: 0 5px;
      color: ${({ theme }) => theme.desktop.bradcumbColor};
    }
  }
  .quickSelect {
		display: flex;
		gap: 1.6rem;
		align-items: center;
		margin-top: 1.6rem;
		.inputBox-blue,
		.input-spacing {
			display: flex;
			margin-top: 0;
			justify-content: space-between;
			width: 100%;
		}
		.txt-blue {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			font-size: 1.4rem;
			font-weight: 400;
			line-height: 2rem;
			white-space: nowrap;
		}
		.dropdown {
			button {
				color: ${({ theme }) => theme.desktop.white};
				font-size: 1.4rem;
			}
		}
		.react-datepicker__input-container {
			input {
				color: ${({ theme }) => theme.desktop.white};
			}
		}
		.btnGroup {
			margin-top: 0;
		}
	}
  .icon-refresh-fill{
  }


  .flag:before {
    content: '';
    display: block;
    border-radius: 100%;
    margin-right: 0.5rem;
  }
  .flag.ch:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/ch.jpg)
      no-repeat top left/cover;
  }
  .flag.cs:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/cs.jpg)
      no-repeat top left/cover;
  }
  .flag.en:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/en.jpg)
      no-repeat top left/cover;
  }
  .flag.th:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/th.jpg)
      no-repeat top left/cover;
  }
  .flag.id:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/id.jpg)
      no-repeat top left/cover;
  }
  .flag.vn:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/vn.jpg)
      no-repeat top left/cover;
  }
  .flag.in:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/in.jpg)
      no-repeat top left/cover;
  }
  .flag.bd:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/bd.jpg)
      no-repeat top left/cover;
  }
  .flag.kh:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/kh.jpg)
      no-repeat top left/cover;
  }
  .flag.kh:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/kh.jpg)
      no-repeat top left/cover;
  }
  .flag.gb:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/gb.jpg)
      no-repeat top left/cover;
  }
  .flag.br:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/br.jpg)
      no-repeat top left/cover;
  }
  .flag.ko:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/ko.jpg)
      no-repeat top left/cover;
  }
  .flag.jp:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/jp.jpg)
      no-repeat top left/cover;
  }
      @-webkit-keyframes rotate {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
  .icon-refresh-fill {
    &:before {
      font-size: 2rem;
    }
    &.active {
      animation: rotate 0.5s linear 2;
    }
  }
	@keyframes rotate {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
  .directions {
		ul {
			li {
				font-weight: 400;
			}
		}
	}

  main section {
    display: flex;
    margin: auto;
    max-width: 1400px;
    width : 100%;
    &.inside{
      padding-top: 4rem;
    }
  }

  .wraper-client{
    max-width : 1400px;
    width : 100%;
    margin : 0 auto;
    padding : 0 1.2rem;
    .title-client{
      font-size: 3.3rem;
      font-weight: 700;
      line-height: normal;
      margin-bottom : 4rem;
    }
    .promotion-status{
      &.claimed {
        background : #FBC208;
        &:before{
          content: 'Claimed';
        }
        
      }
      &.new {
        background: ${({ theme }) => theme.desktop.tipColorError};
        &:before{
          content: 'New';
        } 
      }
      &.active{
        background : #01B901;
        &:before{
          content: 'Active';
        } 
      }
      &.expired {
        background: #6F7689;
        &:before{
          content: 'Expired';
        } 
      }
    }
    
  }
  .progressBarModule {
		background: #232b4f;
		padding: 0.8rem;
		border-radius: 10px;
		max-width: 30rem;
		width: 100%;
		.bounsName {
			font-size: 1.2rem;
			font-weight: 600;
			line-height: 1.8rem;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		}
		.turnover {
			display: flex;
			justify-content: space-between;
			align-items: center;
			&-left {
				font-size: 1.2rem;
				font-weight: 400;
				line-height: normal;
				color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				span {
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				}
			}
			.icon {
				background: none;
				&:before {
					font-size: 1.6rem;
				}
			}
		}

		.progressBar {
			display: flex;
			align-items: center;
		}
		.progressBar .bar {
			height: 0.6rem;
			border-radius: 10px;
			background: #374375;
			margin-right: 10px;
			flex: auto;
			overflow: hidden;
		}
		.progressBar .bar .progress {
			background: #ea6118;
			height: 100%;
			border-radius: 10px;
		}
		.progressBar .percentage {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			font-weight: 400;
			font-size: 1.2rem;
		}
	}
`
