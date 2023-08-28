export const EMAIL_REGEX =
	/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

export const PHONE_LENGTH_REGEX =
	/^\+60[0-9]{9,10}$|\+62[0-9]{10,13}$|\+86[0-9]{10,11}$|\+91[0-9]{10}$|\+66[0-9]{9}$|\+880[0-9]{10}$|\+855[0-9]{8,9}$/

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&*\d]{6,15}$/
