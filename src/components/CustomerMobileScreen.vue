<template>
    <div class="rectangle-container">
        <div class="silo-wrapper">
            <div class="back-to-selection-screen-button-mobile" @click="backToSelectionScreen">Back</div>
            <div class="silo-rectangles" 
                v-for="item in items"
                :key="item.key"
                :class="[item.fill_grade < 10 ? 'red-rectangle': item.fill_grade >= 10 && item.fill_grade < 20 ? 'orange-rectangle' : 'green-rectangle']">
                <div class="rectangle-info">
                    <div class="silo-name">Silo {{ item.silo_number }}</div>
                    <div class="silo-fill-grade">{{ item.fill_grade + '%' }}</div>
                </div>
                <div class="rectangle-info">
                    <label class="empty">Empty F/C</label>
                    <div class="silo-empty">{{ item.empty_fc }}</div>
                </div>
                <div class="rectangle-info">
                    <label class="empty">Complete empty</label>
                    <div class="silo-empty">{{ item.date_complete_empty }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: this.$store.state.silos.dataTableMultiSiloItems,
            fields: this.$store.state.silos.dataTableMultiSiloFields
        }
    },
    methods: {
        backToSelectionScreen() {
            this.$router.push('/selection-screen');
        }
    }
}
</script>

<style lang="scss">
@import 'src/scss/mixins';
@import 'src/scss/variables';

.rectangle-container {
    background-image: url("../assets/silos1.jpg");
    @include background-img;
}

.silo-wrapper {
    @include flex-center;
    flex-direction: column;
    align-items: center;
    padding: 95px 15px 15px 15px;
    opacity: 0.9;
}

.silo-rectangles {
    @include flex-center;
    flex-direction: column;
    align-items: center;
    margin: 3px 0px;
    font-size: 15px;
    max-width: 390px;
    width: 100%;
    height: 120px;
    border-radius: 4px;
}

.red-rectangle {
    background-color: red;
}

.orange-rectangle {
    background-color: #fcc203; 
}

.green-rectangle {
    background-color: #8bc34a;
}

.rectangle-info {
    display: flex;
    justify-content: space-between;
    width: 88%;
    color: #fff;
}

.silo-name {
    padding-bottom: 20px;
    font-weight: 700;
    font-size: 22px;
}

.empty{
    margin-bottom: 0px;
    font-size: 16px;
}

.silo-fill-grade {
    font-weight: 700;
    font-size: 22px;
}

.silo-empty {
    width: 60%;
    font-size: 16px;
}

.back-to-selection-screen-button-mobile {
    background-color: $table-back-button-color;
    opacity: 0.9;
    border-radius: 4px;
    left: 50px;
    top: 50px;
    @include log-out-button;

    &:hover {
        background-color: $table-back-button-active-color;
    }
}
</style>
