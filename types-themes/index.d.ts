/* eslint-disable @typescript-eslint/no-explicit-any */
import 'styled-components'

import { theme } from '../themes/theme'

type Theme = typeof theme
declare module 'styled-components' {
	export interface DefaultTheme extends Theme {}
}
