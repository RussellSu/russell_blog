import TOOL from '@/web/utils/tool.js'

export function typeCheck (store) {
  // const namePlaces = ['app', 'userProfile']
  let prevState = TOOL.deepClone(store.state)
  store.subscribe((mutation, state) => {
    console.log('typeCheck subscribe: ', mutation, state)
    // let stateName = namePlace[mutation.type]
    const prevType = TOOL.judgeType(prevState[mutation.type])
    const nextType = TOOL.judgeType(state[mutation.type])
    if (prevType !== nextType) {
      console.log('state type changed:')
      console.log('prev type:', prevType)
      console.log('next type:', nextType)
    }
    prevState = state
  })
}
