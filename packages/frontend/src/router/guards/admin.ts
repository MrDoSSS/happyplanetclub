export const admin: HPC.Guard = ({ next, store }) => {
  if (store.loggedIn && store.user?.admin) {
    next()
  } else {
    next({
      name: 'home',
      stopPipeline: true,
    })
  }
}
