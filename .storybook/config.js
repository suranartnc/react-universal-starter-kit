import { configure, addDecorator } from '@kadira/storybook'
import CenterDecorator from './decorators/CenterDecorator'

const req = require.context('../stories', true, /.js$/)

addDecorator(CenterDecorator)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
