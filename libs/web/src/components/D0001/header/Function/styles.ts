import styled from "styled-components";

export const FunctionContainer = styled.div`
    width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      position: relative;
      .username{
        position: relative;
        display: flex;
      }
      input{
          font-family: $family;
          font-weight: 600;
          width: 150px;
          background: none;
          border: 2px solid white;
          border-radius: 50px;
          padding: 3.5px 0 3.5px 10px;
          display: flex;
          justify-content: flex-start;
          margin: 0 15px 0 0;
          &::placeholder{
            color: #D1D1D1;
            text-align: left;
            padding-left: 15px;
          }
        }
      .login, .join, .line-login{
        padding: 10px 0;
        border-radius: 50px;
        color: white;
        width: 110px;
        display: flex;
        justify-content: center;
      }
      .login{
        background: #648DD6;
        margin-right: 15px;
      }
      .join{
        background: #FF7600;
      }
      .line-login{
        display: flex;
        background: #51cb33;
        align-items: center;
        margin-left: 15px;
        img{
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }
      .forgot{
        position: absolute;
        bottom: -26px;
        left: 7px;
        color: #D1D1D1;
        font-size: 10px;
        font-weight: 400;
        width: 340px;
      }
      .country{
        margin-left: 30px;
      }
      .country-current{
        margin: 6px 0;
        background: #fff;
        border-radius: 15px;
        padding: 20px;
        display: flex;
        align-items: center;
        .flag{
          display: flex;
          align-items: center;
          &:before{
            width: 38px;
            height: 38px;
            margin-right: 14px;
            bottom: 1px;
            border-color: #dadada;

          }
        }
        button{
          font-size: 12px;
          color: #878787;
        }
        .country-info{
          flex-direction: column;
          align-items: flex-start;
        }
        .country-name{
          color: #0A1B38;
        }
        div{
          display: flex;
          align-items: center;
          color: #0A1B38;
          flex-flow: row;
          button{
            border-right: 1px solid $blue16;
            border-right-color: #878787;

            padding: 0 8px;
            &:last-child{
              border-right: 0;
              padding: 0 0 0 8px;
            }
            &:first-child{
              padding: 0 8px 0 0;
            }
            &:hover{
              color: $orange;
            }
          }
        }
      }
      .country-list{
        min-width: 280px;
        display: none;
        position: absolute;
        margin-top: 40px;
        background: #ECECEC;
        border-radius: 15px;
        padding: 0 6px;
        right: 0;
        top: 55px;
        z-index: 3;
        box-shadow: 0 0 10px #0a1b389e;

        .country-option{
          height: 350px;
          overflow-y: scroll;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #fff;
          border-radius: 15px;
          padding: 10px 20px;
          margin: 6px 0 ;
          font-size: 14px;
          /* width */
          &::-webkit-scrollbar {
            width: 5px;
          }

          /* Track */
          &::-webkit-scrollbar-track {
            background: transparent;
          }

          /* Handle */
          &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius:15px;
          }

          /* Handle on hover */
          &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }

          button,div{
            margin: 6px 0 ;
            }

          .flag{
            display: flex;
            align-items: center;
            &:before{
              width: 25px;
              height: 25px;
              margin-right: 14px;
              bottom: 1px;
              border-color: #dadada;
            }
          }
        }

          .country-name{
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 4px;
          }

          button,a,div{
            display: flex;
            align-items: center;
            color: #0A1B38;
            flex-flow: row;
            button{
              border-right: 1px solid $blue16;
              border-right-color: #878787;

              padding: 0 8px;
              &:last-child{
                border-right: 0;
                padding: 0 0 0 8px;
              }
              &:first-child{
                padding: 0 8px 0 0;
              }
              &:hover{
                color: $orange;
              }
            }
          }
          &.active{
            display: block;
          }
        }
        .flag{
          display: flex;
          align-items: center;
          img{
            width: 15px;
            margin-left: 3px;
          }
          &:before{
            border: 2px solid white;
            width: 35px;
            height: 35px;
            line-height: 26px;
          }
        }
      .memberinfo {
        width: 60px;
        margin-right: 5px;
      }
      .grade{
        margin-right: 10px;
        &-text{
          display: flex;
          align-items: center;
          color: #fff;
          &.active {
            &::after{
              transform: rotate(180deg);
              transition: .35s;
            }
          }
          &::after{
            content: "";
            display: block;
            background: url(#{$public-banner-host}/desktop/img/4.0/down-1.png)no-repeat center center / cover;
            width: 12px;
            height: 14px;
            margin-left: 5px;
            transition: .35s;
          }
        }
        &-color{
          display: flex;
          align-items: center;
          .dots{
            width: 15px;
            height: 15px;
            background: #E8AE37;
            border-radius: 50px;
            margin-right: 4px;
          }
        }
        &.vintage{
          .dots{
            background: #c8600b;
          }
        }
        &.silver{
          .dots{
            background: #cacaca;
          }
        }
        &.gold{
          .dots{
            background: #ce9b0a;
          }
        }
        &.titanium{
          .dots{
            background: #828282;
          }
        }
        &.diamond{
          .dots{
            background: #63cde0;
          }
        }
        &.nova{
          .dots{
            background: #d4d4d4;
          }
        }
        &.active{
          .home-profile{
            display: block;
          }
        }
      }
      .message{
        position: relative;
        display: none;
        img{
          width: 75%;
        }
        &-text{
          position: absolute;
          top: -4px;
          right: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: red;
          width: 10px;
          height: 10px;
          border-radius: 50px;
        }
        .msgPop{
          display: flex;
          position: absolute;
          top: 1px;
          left: -10px;
          transform: translateY(100%);
          background: #FF7600;
          padding: 6px 12px 6px 15px;
          display: flex;
          align-items: center;
          border-radius: 10px;
          z-index: 3;
          box-shadow: 0 0 3px #797979;
          div{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 150px;
          }
          button{
            border: 1px solid white;
            color: #fff;
            width: 18px;
            height: 18px;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            margin: 0 0 0 10px;
            &::before{
              transform: scale(.7);
            }
          }
          &::after{
            border-color: transparent transparent #FF7600;
            border-style: solid solid solid solid;
            border-width: 8px;
            top: 1px;
            content: "";
            height: 0;
            position: absolute;
            width: 0;
            transform: translateY(-100%);
          }
        }
        &.active{
          display: block;
        }
      }
      .line{
        border-right: 1px solid white;
        height: 40px;
        margin: 0 10px;
      }
      .home-balance{
        .wallet {
          color: #fff;
          display: flex;
          align-items: center;
          &.active {
            &::after{
              transform: rotate(180deg);
              transition: .35s;
            }
          }
          &::after{
            content: "";
            display: block;
            background: url(#{$public-banner-host}/desktop/img/4.0/down-1.png)no-repeat center / cover;
            width: 12px;
            height: 14px;
            margin-left: 5px;
            transition: .35s;
          }
        }
        .icon-spinner {
          &::before{
            content: "";
            display: block;
            background: url(#{$public-banner-host}/desktop/img/4.0/refresh-1.png)no-repeat center / cover;
            width: 15px;
            height: 15px;
            margin-right: 2px;
          }
          &.active {
            animation: rotate 0.5s linear 2;
          }
        }
        .icon-plus {
          &::before{
            cursor: pointer;
            content: "";
            display: block;
            background: url(#{$public-banner-host}/desktop/img/4.0/plus.png)no-repeat center / cover;
            width: 15px;
            height: 15px;
            margin-left: 2px;
          }
        }
        .icon-minus{
          &::before{
            cursor: pointer;
            content: "";
            display: block;
            background: url(#{$public-banner-host}/desktop/img/4.0/minus.png)no-repeat center / cover;
            width: 15px;
            height: 15px;
            margin-left: 2px;
          }
        }
        .balance-money{
          display: flex;
          align-items: center;
        }
        .balance-submenu{
          display: none;
          background: #FFF;
          position: absolute;
          top: 95px;
          right: 20px;
          z-index: 3;
          color: #0A1B38;
          border-radius: 20px;
          padding: 20px;
          font-size: 12px;
          width: 300px;
          box-shadow: 0 0 10px #0a1b389e;
          .balance{
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            padding: 0 8px;
            margin-bottom: 10px;

            span{
              &:nth-child(2){
                display: flex;
                align-items: center;
              }
            }
            .refresh-icon{
              margin-left: 2px;
              &::after{
                display: block;
                content: "";
                background: url(#{$public-banner-host}/desktop/img/4.0/refresh_w.png)no-repeat center / cover;
                width: 16px;
                height: 16px;
              }
            }
          }
          .walletBalance{
            background: #cdcdcd;
            padding: 8px;
            font-size: 15px;
            border-radius: 6px;
            margin-bottom: 10px;
            .walletName{
              display: flex;
              justify-content: space-between;
            }
            .bouns{
              font-size: 13px;
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
            }
            .percentage{
              font-size: 13px;
            }
          }
          .btnGroup{
            margin: 20px 0;
            a{
              &:nth-child(2){
                margin-left: 10px;
              }
            }
            .orange{
              font-size: 14px;
              background: #0A1B38;
              margin: 0;
              &:hover{
                background: #FF7600;
              }
            }
          }
          .loginLog{
            display: flex;
            justify-content: space-between;
          }
          .transactionLog{
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
          }
        }
        &.active{
          .balance-submenu{
            display: block;
          }
        }
      }
      .deposit-btn{
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FF7600;
        width: 125px;
        height: 48px;
        border-radius: 50px;
        margin-left: 10px;
        color: #fff;
      }
`