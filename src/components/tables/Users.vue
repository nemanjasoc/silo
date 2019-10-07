<template>
    <b-container fluid>
        <div class="master-data-users-title">Master Data Screen users</div>

        <b-table
            responsive
            show-empty
            hover
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :fields="dataTableUsersFields"
            :items="filtered">

            <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">
                    <input class="table-input" v-if="field.sortable" v-model="filters[field.key]">
                </td>
            </template>
        </b-table>

        <div class="back-to-feeder-selection">
            <div class="back-to-feeder-selection-button" @click="backToSelectionScreen">Back</div>
        </div>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            sortDesc: false,
            sortBy: null,
            sortDirection: 'asc',
            dataTableUsersFields: this.$store.state.tableUsers.dataTableUsersFields,
            filter: null,
            filters: {
                user_name: '',
                user_initials: '',
                user_e_mail: '',
                mobile_user: '',
                user_group: ''
            },
            items: this.$store.state.tableUsers.dataTableUsersItems
        }
    },
    computed: {
        filtered () {
            const filtered = this.items.filter(item => {
                return Object.keys(this.filters).every(key =>
                String(item[key]).includes(this.filters[key]))
            })
            return filtered.length > 0 ? filtered : [{
                user_name: '',
                user_initials: '',
                user_e_mail: '',
                mobile_user: '',
                user_group: ''
            }]
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

.master-data-users-title {
    @include table-title;
}

tr {
    background: #fff;
}

.table thead th {
    @include table-th;
}

.table th, .table td {
    @include table-td;
}

.table-responsive {
    text-align: center;
}

.table.b-table > thead > tr > th[aria-sort]::before, .table.b-table > tfoot > tr > th[aria-sort]::before {
    @include sort-arrow; 
}

.table-input {
    @include table-input;

    &:focus {
        border-bottom: 2px solid $table-back-button-color;
    }
}

.back-to-feeder-selection-button {
    margin: 40px 50px 40px 0px;
    background: $table-back-button-color;
    border-radius: 10px;
    @include log-out-button;

    &:active {
        background-color: $table-back-button-active-color;
    }
}
</style>
