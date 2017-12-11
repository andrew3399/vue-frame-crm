import Frame from './frame'
import * as route from './route'
import * as httpHandle from './http'
import * as locals from './locals'
import views from './notices'
import storeModule from './store'
// import EventHub from './eventHub'

const TFrame = function (Vue, opts = {}) {
  Vue.component(Frame.name, Frame)
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  TFrame(window.Vue)
}

export {
  TFrame,
  route,
  httpHandle,
  locals,
  views,
  storeModule
  // EventHub
}
