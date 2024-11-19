import { FunctionContainer } from "@nx-next-app/components/D0001/header/Function/styles";
import React, { FC, ReactNode } from "react";

import Country from "./Country";
import Login from "./Login";
import MemberFile from "./MemberFile";
import Wallet from "./Wallet";

interface IFunctionProps {
	children: ReactNode
}

export interface IFunctionInterface extends FC<IFunctionProps> {
	Login: typeof Login
	Country: typeof Country
	Wallet: typeof Wallet
	MemberFile: typeof MemberFile
}

const Function: IFunctionInterface = ({ children }: IFunctionProps) => {
	return <FunctionContainer>{children}</FunctionContainer>
}

Function.Login = Login
Function.Country = Country
Function.Wallet = Wallet
Function.MemberFile = MemberFile

export default Function
