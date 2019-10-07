<template>
    <div>
        <div class="login-image"></div>
        <div class="login-content">
            <div class="user">
                <i class="fa fa-user-o" aria-hidden="true"></i>
            </div>
            <h3>Sign In</h3>
            <div class="user-content">
                <form @submit.prevent="logIn()">
                    <div class="wrap-input">
                        <input type="username" id="username" v-model="username" required/>
                        <label for="username">Username</label>
                    </div>
                    <div class="wrap-input">
                        <input type="password" id="password" v-model="password" required/>
                        <label for="password">Password</label>
                    </div>
                    <button class="submit-login" type="submit" value="Submit">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        logIn() {
            var allUsers = this.$store.state.users;
            let matchedUser;
      
            for (var  i = 0; i < allUsers.length; i++) {
                var currentUserName = allUsers[i].username;
                var currentUserPassword = allUsers[i].password;
                
                if (currentUserName === this.username && currentUserPassword === this.password) {
                    matchedUser = allUsers[i];
                }
            }

            if (matchedUser) {
                this.$store.commit('setLoggedInUser', matchedUser);
                if (matchedUser.role == 'feeder' || matchedUser.role == 'customer') {
                    this.$router.push('/selection-screen');
                }
                if (matchedUser.role == 'installer') {
                    this.$router.push('/installer-selection');
                }
            } else {
                return alert("Wrong username or password. Try again!")
            }
            this.username = "";
            this.password = "";
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/mixins';
@import 'src/scss/variables';

.login-image {
    background-image: url("../assets/nature-man.jpg");
    @include background-img;
    filter: blur(8px);
    -webkit-filter: blur(8px);
}

.login-content {
    @include content-position;
    max-width: 360px;
    @include flex-center;
    flex-direction: column;
}

.user {
    position: absolute;
    top: -25px;
    width: 50px;
    height: 50px;
    color: #fff;
    background-color: $login-green-color;
    border-radius: 50%;
    @include flex-center;
    align-items: center;
    font-size: 25px;
    right: calc(50% - 25px);
}

h3 {
    margin: 30px 0 15px 0;
}

.user-content {
    width: 75%;
    margin: 15px auto;
}

.wrap-input {
    position: relative;
    margin-bottom: 30px;
}

input[type="username"],
input[type="password"] {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    width: 100%;
    height: 40px;
    border: 0;
    outline: 0;
    padding: 6px 15px;
    border: 1px solid #fff;
    box-shadow: none;
    color: #555555;
    font-size: 16px;
    border-radius: 4px;
    @include transition-vendors(border 0.4s ease-out);

    &:invalid {
        outline: 0;
    }

    &:focus,
    &:valid {
        border-color: $login-green-color;

        &~label,
        &~label {
            font-size: 12px;
            top: -24px;
            right: -15px;
            color: $login-green-color;
        }
    }
}

label {
    font-family: 'Poppins', sans-serif;
    position: absolute;
    display: flex;
    top: 7px;
    right: -15px;
    width: 100%;
    color: #8080807d;
    cursor: text;
    @include transition-vendors(0.2s all);
}

.submit-login {
    width: 100%;
    color: #fff;
    background-color: $login-green-color;
    border-radius: 5px;
    height: 40px;
    outline: none;
    border: none;
    font-size: 20px;
    margin-bottom: 15px;
}
</style>
