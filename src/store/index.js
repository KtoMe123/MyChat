import {createStore} from 'vuex'
import {ref} from 'vue'

const UsersInfo = ref('')
const userList = 'http://localhost:8080/api/users'


function getUsers() {
  fetch(userList)
    .then((response) => response.json())
    .then((data) => UsersInfo.value = data)
}
getUsers()

const store = createStore({
  state: () => ({
      UsersInfo,
  }),


})

export default store;