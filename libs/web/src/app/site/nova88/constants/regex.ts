export const USERNAME_REGEX = /^[A-Za-z0-9]{6,18}$/

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&*\d]{6,15}$/

export const REALNAME_REGEX =
	/^[\p{L}. \p{Script=Han}\p{Script=Hangul}\p{Script=Thai}\p{Script=Bengali}\p{Script=Devanagari}\p{Script=Latin}\p{Script=Cyrillic}\p{Script=Khmer}\p{Script=Hiragana}\p{Script=Katakana}]+$/u
