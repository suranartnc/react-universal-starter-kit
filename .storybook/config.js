import { configure, addDecorator } from '@kadira/storybook'
import GlobalStyle from '../stories/decorators/GlobalStyle'

const req = require.context('../stories', true, /.js$/)

addDecorator(GlobalStyle)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
