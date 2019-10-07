<template>
    <div>
        <div class="selection-screen-image"></div>
        <div class="selection-screen-content">   
            <router-link tag="button" :to="{name: 'silos'}" class="table-button">Silos</router-link>
            <template v-if="!isFeeder">
                <router-link tag="button" :to="{name: 'customer-mobile-screen'}" class="table-button">Mobile screen</router-link>
            </template>
            <template v-if="isFeeder">
                <label>Master Data</label>
                <div class="master-data-buttons">
                    <router-link tag="button" :to="{name: 'users'}" class="table-button">Users</router-link>
                    <router-link tag="button" :to="{name: 'feed'}" class="table-button">Feed</router-link>
                    <router-link tag="button" :to="{name: 'customer'}" class="table-button">Customer</router-link>
                </div>
            </template>
        </div>
        <div class="log-out-selection-screen-button" @click="logOutSelectionScreen">Log out</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isFeeder: this.$store.state.loggedInUser.role == 'feeder'
        }
    },
    methods: {
        logOutSelectionScreen() {
			this.$store.commit('resetLoggedInUser');
			this.$router.push('/login');
		}
    }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/mixins';
@import 'src/scss/variables';

.selection-screen-image {
    background-image: url("../assets/silos.jpg");
    @include background-img;
    filter: blur(8px);
    -webkit-filter: blur(8px);
}

.selection-screen-content {
    @include content-position;
    max-width: 400px;
}

.log-out-selection-screen-button {
    margin-bottom: 30px;
    margin-top: -16px;
    background-color: $log-out-button-color;
    border-radius: 4px;
    right: 50px;
    top: 50px;
    @include log-out-button;

    &:hover {
        background-color: $button-hover-green;
    }
}

.table-button {
    width: 70%;
    margin: 6px 0;
    @include green-button;

    &:hover {
        background-color: $button-hover-green;
    }
}

.master-data-buttons {
    @include flex-center;
    flex-wrap: wrap;
}

label {
    padding-top: 65px;
    font-size: 28px;
}
</style>
