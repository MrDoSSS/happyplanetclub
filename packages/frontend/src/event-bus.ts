import mitt from 'mitt'

type Events = {
  'Loader:toggle': boolean
  'ConnectModal:show': boolean
  'ConnectModal:hide': void
}

const emitter = mitt<Events>()

export { emitter }
