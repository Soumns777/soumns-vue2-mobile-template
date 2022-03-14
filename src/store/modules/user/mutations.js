import { GET_USER_MSG } from '@/store/modules/user/constant'

export default {
  [GET_USER_MSG] (state, user) {
    state.user = user
  }
}
