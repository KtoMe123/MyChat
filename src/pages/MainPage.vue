<template>
    <div class="container">
        <login-form @OpenMain="isShow" :Joined="Joined" v-if="Joined === false" ></login-form>
        <div v-if="Joined === true" class="main">
            <div class="main__user-frame">
                <user-frame :HeadIcons="HeadIcons"/>
                <MySearch v-focus placeholder="Search or start new chat" v-model="SearchUser">
                    <ion-icon class="search-icon" name="search-outline"></ion-icon>
                </MySearch>
                <form  @submit.prevent="AddUsers" class="add-user">
                    <span class="add-user__text">Add user 
                        <input @input="AddUser(SearchUsers + AddMail)" v-model="AddMail" class="add-user__input" type="email">
                    </span> 
                    <button type="submit" class="add-user__button">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </form>
                <UsersList :MyMess="AllMess" :usersSort="SortedUsers" :MainUser="SortedUsers" :MainUserInfo="MainUser" :TrueName="TrueName" @sendId="IDget"></UsersList>
            </div>
            <div :class="['main__chat-frame', {'main__chat-frame_small': open.value === true}]">
                <ChatFrame @Id="getId" @OpenInfo="OpenInfo" :UsersId="UsersId" :UserName="TrueName" :UsersInfo="SortedUsers" :TrueName="TrueName" :HeadIcons="HeadIcons"/>
            </div>
            <div :class="[{'main__info-open': open.value === true}, 'main__info']">
                <InfoForm :UsersId="UsersId" :OpenInfo="open" :UsersInfo="$store.state.UsersInfo"/>
            </div>
        </div>
    </div>
</template>



<script setup>
import UsersList from "@/components/UsersList.vue";
import UserFrame from '@/components/UserFrame.vue'
import ChatFrame from '@/components/ChatFrame.vue'
import LoginForm from '@/components/LoginForm.vue'
import InfoForm from '@/components/InfoForm.vue'
import axios from 'axios'
import {ref, computed} from 'vue'
import MySearch from '../components/UI/MySearch.vue'
import { useStore } from 'vuex'

const AllMess = ref('')

const AddMail = ref('')

const AddedUser = ref('')

const MainUserList = ref([])
const NewCon = ref([])
const NewConTo = ref([])
const AllVal = ref('')
const PushVal = ref([])

const HeadIcons = [
        {name: 'scan-circle-outline'},
        {name: 'chatbox'},
        {name: 'ellipsis-vertical'}
]

const store = useStore()
const UsersInfo = computed(() => store.state.UsersInfo)
const open = ref(false)
const UsersId = ref('def')
const SearchUsers = ref(`http://localhost:8080/api/users/`)
const SearchUser = ref('')
const MainUser = ref('')
const Joined = ref(false) 
const TrueName = ref('') 
const TrueVal = ref([])


const isShow = (el) => {
    TrueName.value = el[1]
    MainUser.value = el[2]
    AllMess.value = el[3]
    console.log(AllMess.value[0])
    AllVal.value = SortedUsers.value
    return Joined.value = el[0]
}


const OpenInfo = (el) => {
    console.log(MainUser.value[0].contact)
    return open.value = el
    
}
const IDget = (UserId) => {
    return UsersId.value = UserId.value
}

const SortedUsers = computed(() => {
    if (SearchUser.value) {
        return MainUser.value[0].contact.filter(item => {
            return item.username.toLowerCase().includes(SearchUser.value.toLowerCase());
        });
    }
    
    return MainUser.value[0].contact
    })


function AddUser(href) {
  fetch(href)
    .then((response) => response.json())
    .then((data) => AddedUser.value = data)
}

const AddUsers = () => {
    const UsMail = ref(AddMail.value)
    if (AddedUser.value.length < 1) {
        alert("Пользователя не существует")
        return
    }
    if (AddMail.value === TrueName.value) {
        alert("Добавить самого себя нельзя")
        AddMail.value = ''
        return
    }
    for(let i = 0; SortedUsers.value.length > i; i++) {
        if(AddMail.value === SortedUsers.value[i].mail) {
            alert("Уже в контактах")
            AddMail.value = ''
            return
        }
    }
    fetch('http://localhost:8080/api/users/' + AddedUser.value[0].mail)
        .then((response) => response.json())
        .then((data) => TrueVal.value.push(data[0]))
    function PushVal() {
        NewCon.value = (TrueVal.value).concat(AllVal.value)
        NewConTo.value = (MainUser.value).concat(TrueVal.value[0].contact)
        AllVal.value = []
        axios
            .put('http://localhost:8080/api/users',
            {
                contact: NewCon.value,
                mail: TrueName.value,
            }
            )
            .then(response => {
                console.log('Значение для основного юзера успешно добавленно');
                console.log(TrueVal.value);
                console.log(AllVal.value);
            })
            .catch(err => {
                console.error('Ошибка при добавленнии значения:', err);
            });
        axios
            .put('http://localhost:8080/api/users',
            {
                contact: NewConTo.value,
                mail: UsMail.value,
            }
            )
            .then(response => {
                console.log('Значение для доп юзера успешно добавленно');
                console.log(NewConTo.value)
            })
            .catch(err => {
                console.error('Ошибка при добавленнии значения:', err);
            });
    }
    setTimeout( PushVal, 50)
    console.log(MainUser.value)
    AddedUser.value = ''
    AddMail.value = ''
    function Update() {
        fetch("http://localhost:8080/api/users/" + TrueName.value)
            .then((response) => response.json())
            .then((data) => MainUser.value = data)
        SortedUsers.value = ''
    }
    setTimeout( Update, 110)
        console.log(MainUser.value)
}

        
</script>

<style lang="scss" scoped>

body {
    background: red
}

.container {
    position: relative;
    width: 1396px;
    transition: .3s;
    height: 885px;
    min-width: 100%;
    background: #fff;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.06), 0 2px 5px 0 rgba(0,0,0,0.06)0;
    display: flex;
}

@keyframes slidein {
    from {
        
        width: 0%;
    }

    to {
        width: 29%;
    }
}

@media screen and (max-width: 1440px) {
    .container {
        width: 1200px
    }
    @keyframes slidein {
    from {
        
        width: 0%;
    }
    to {
        width: 27.5%;
    }
}
}
@media screen and (max-width: 1222px) {
    .container {
        width: 1000px
    }
    @keyframes slidein {
    from {
        
        width: 0%;
    }
    to {
        width: 25%;
    }
    }
}

.main {
    box-shadow: 1px 1px 30px 1px gray;
    display: flex;
    width: 100%;
    &__user-frame {
        width: 100%;
        position: relative;
        flex: 30%;
        height: 100%;
        transition: .6s;
        background: #fff;
        max-width: 405px;
    }
    @media screen and (max-width: 1440px) {
        &__user-frame {
            max-width: 351px;
        }
    }
    @media screen and (max-width: 1222px) {
        &__user-frame {
            max-width: 300px;
        }
    }
    
    &__chat-frame {
        width: 100%;
        right: 0;
        display: flex;
        position: relative;
        flex: 70%;
        height: 100%;
        background: #e5ddd5;
    }
    &__chat-frame_small {
        flex: 45%
    }
    &__info {
    display: none;
    }
    &__info-open {
    animation-name: slidein;
    display: block;
    overflow: hidden;
    animation-duration: 0.25s;
    transition: .4s;
}
}

.search-icon {
    position: absolute;
    left: 30px;
    top: 14px;
    font-size: 19px;
}

.add-user {
    display: flex;
    padding: 14px;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    &__button {
        padding: 7px 10px;
        border-radius: 45px;
        background: #d7e8fc;
        font-size: 14px;
        &:hover {
            background: #7ebaeb;
        }
    }
    &__text {
        font-weight: bold;
        font-size: 16px;
    }
    &__input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        font-size: 14px;
        margin: 0px 10px 0px 10px;
        padding: 0px 10px;
        max-width: 160px;
    }
    @media screen and (max-width: 1222px) {
        &__text {
            text-align: center;
            justify-content: center;
            
        }
        &__input {
            margin-top: 10px;
            max-width: 100%;
            font-size: 16px;
    }
    }
}
</style>