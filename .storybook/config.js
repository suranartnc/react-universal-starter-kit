import { configure } from '@kadira/storybook'

function loadStories() {
	require('../stories/demo')
}

configure(loadStories, module)