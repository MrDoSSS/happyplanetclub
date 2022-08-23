export const admin: HPC.Guard = ({ next, store }) => {
  if (store.loggedIn && store.admin) {
    next()
  } else {
    next({
      name: 'admin-login',
      stopPipeline: true,
    })
  }
}
