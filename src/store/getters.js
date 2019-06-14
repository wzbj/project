const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routerList: state => state.user.RouterList,
  navMenu: state => state.app.navMenu,
  roles: state => state.user.roles,
  typeList: state => state.user.typeList,
  wordList: state => state.user.wordList
}
export default getters
