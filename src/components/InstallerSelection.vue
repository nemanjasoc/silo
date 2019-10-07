<template>
    <div class="buttons-container">
        <div class="circle">
            <div class="customer-selection">
                <router-link tag="button" :to="{name: 'installer'}" class="customer-button">Customer selection</router-link>
            </div>
        </div>
        <div class="log-out-installer-button" @click="logOutInstallerSelection">Log out</div>
    </div>
</template>

<script>
export default {
    methods: {
        logOutInstallerSelection() {
            this.$store.commit('resetLoggedInUser');
            this.$router.push('/login');
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/mixins';
@import 'src/scss/variables';

.buttons-container {
    background-image: url("../assets/silos2.jpg");
    @include background-img;
    padding: 15px 15px 15px 15px;
    @include flex-center;
}

.circle {
    width: 300px;
    height: 300px;
    background-color: #dbe4f0a3;
    border-radius: 50%;
    @include flex-center;
    align-items: center;
    margin: auto;
    flex-direction: column;
    -moz-transition: width 1s, height 1s;
    -o-transition: width 1s, height 1s;
    -webkit-transition: width 1s, height 1s;
    transition: width 1s, height 1s;

    &:hover {
        width: 380px;
        height: 380px;
        cursor: pointer;
    }
}

.log-out-installer-button {
    @include log-out-button;
    right: 50px;
    top: 50px;
    border-radius: 4px;
    background-color: $log-out-button-color;

    &:hover {
        background: $button-hover-green;
    }
}

.customer-selection {
    width: 75%;
}

.customer-button {
    width: 100%;
    @include green-button;

    &:hover {
        background-color: $button-hover-green;
    }
}

@media only screen and (max-width: 500px) {
    .circle {
        width: 250px;
        height: 250px;

        &:hover {
            width: 330px;
            height: 330px;
        }
    }

    .customer-button {
        font-size: 17px;
        height: 50px;
    }
}
</style>
