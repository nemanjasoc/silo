<template>
    <b-container fluid>
        <div class="silo-installation-title">Master Data Silo Installation</div>

            <b-table
                responsive
                show-empty
                hover
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :fields="dataTableInstallationFirstFields"
                :items="filtered">

                <template slot="top-row" slot-scope="{ fields }">
                    <td v-for="field in fields" :key="field.key">
                        <input class="table-input" v-if="field.sortable" v-model="filters[field.key]">
                    </td>
                </template>
            </b-table>

            <app-installer-second-table></app-installer-second-table>

            <div class="back-to-installer-selection-button" @click="backToInstallerSelection">Back</div>  
    </b-container>
</template>

<script>
import InstallerSecondTable from './InstallerSecondTable.vue';

export default {
    data() {
        return {
            sortDesc: false,
            sortBy: null,
            sortDirection: 'asc',
            dataTableInstallationFirstFields: this.$store.state.installer.dataTableInstallationFirstFields,
            filter: null,
            filters: {
                customer_name: '',
                mobile_customer: '',
                address_customer: '',
                zip_code_customer: '',
                city: '',
                silo_number: ''
            },
            items: this.$store.state.installer.dataTableInstallationFirstItems
        }
    },
    components: {
        appInstallerSecondTable: InstallerSecondTable
    },
    computed: {
        filtered () {
            const filtered = this.items.filter(item => {
                return Object.keys(this.filters).every(key =>
                String(item[key]).includes(this.filters[key]))
            })
            return filtered.length > 0 ? filtered : [{
                customer_name: '',
                mobile_customer: '',
                address_customer: '',
                zip_code_customer: '',
                city: '',
                silo_number: ''
            }]
        }
    },
    methods: {
        backToInstallerSelection() {
            this.$router.push('/installer-selection');
        }
    }
}
</script>

<style lang="scss">
@import 'src/scss/mixins';
@import 'src/scss/variables';

.silo-installation-title {
    @include table-title;
    margin-bottom: -40px;
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

input {
    outline: none;
}

.back-to-installer-selection-button {
    margin: 40px 0 40px 50px;
    background: $table-back-button-color;
    border-radius: 10px;
    @include log-out-button; 

    &:active {
        background-color: $table-back-button-active-color;
    }
}
</style>
