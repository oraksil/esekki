import { configure } from '@storybook/react'
// automatically import all files ending in *.stories.tsx
configure(require.context('../components', true, /\.stories\.tsx?$/), module)
