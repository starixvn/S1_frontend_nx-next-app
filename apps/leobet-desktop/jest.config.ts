/* eslint-disable */
export default {
	displayName: 'leobet-desktop',
	preset: '../../jest.preset.js',
	transform: {
		'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
		'^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/apps/leobet-desktop',
}
