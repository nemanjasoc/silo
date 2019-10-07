<template>
    <b-container fluid>
        <div class="silo-screen-title">Multi Silo Screen</div>
        <div class="table-wrapper">
            <b-table
                responsive
                show-empty
                hover
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :fields="dataTableMultiSiloFields"
                :items="filteredItems">

                <template slot="top-row" slot-scope="{ fields }">
                    <td v-for="field in fields" :key="field.key">
                        <input class="table-input" v-if="field.sortable" v-model="filters[field.key]">
                        <b-dropdown 
                            v-if="field.dropable" 
                            size="lg" id="dropdown-1" 
                            :text="selectedDropDownItem ? selectedDropDownItem.name : 'ALL'" 
                            variant="primary" 
                            class="m-2">
                            <b-dropdown-item 
                                href="#" 
                                v-for="dropdownItem in dropdownItems" 
                                :key="dropdownItem.key" 
                                @click="selectDropdownItem(dropdownItem)">
                                {{ dropdownItem.name }}
                            </b-dropdown-item>
                        </b-dropdown>
                    </td>
                </template>

                <template slot="online" slot-scope="row">
                    <span class="online" v-if="row.item.online"></span>
                    <span class="offline" v-if="!row.item.online"></span>
                </template>
                
                <template slot="fill_grade" slot-scope="row">
                    <span>{{ row.item.fill_grade + '%' }}</span>
                </template>

                <template slot="empty_fc" slot-scope="row">
                    <span>{{ row.item.empty_fc }}</span>
                </template>

                <template slot="new_order" slot-scope="row">
                    <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                        {{ row.item.new_order }}
                    </span>
                    <input type="text" 
                        name="new-order" 
                        class="editable-input-field" 
                        @dblclick="updateEditedItem(row)" 
                        v-if="row.detailsShowing" 
                        v-model="row.item.new_order" 
                        @keyup.enter="updateEditedItem(row)" />
                </template>

                <template slot="remarks" slot-scope="row">
                    <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                        {{ row.item.remarks }}
                    </span>
                    <input type="text" 
                        name="remarks" 
                        class="editable-input-field" 
                        @dblclick="updateEditedItem(row)" 
                        v-if="row.detailsShowing" 
                        v-model="row.item.remarks" 
                        @keyup.enter="updateEditedItem(row)" />
                </template>

                <template slot="date_complete_empty" slot-scope="row">
                    <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                        {{ row.item.date_complete_empty }}
                    </span>
                    <input type="text" 
                        name="date-complete-empty" 
                        class="editable-input-field" 
                        @dblclick="updateEditedItem(row)" 
                        v-if="row.detailsShowing" 
                        v-model="row.item.date_complete_empty" 
                        @keyup.enter="updateEditedItem(row)" />
                </template>

                <template slot="row-details" slot-scope="row">
                </template>

                <template slot="actions" slot-scope="row">
                    <download-csv class="csv" :data="[row.item]">CSV Download</download-csv>
                </template>
            </b-table>
        </div>
        <div class="back-to-selection-screen-button" @click="backToSelectionScreen">Back</div>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            sortDesc: false,
            sortBy: null,
            sortDirection: 'asc',
            dataTableMultiSiloFields: this.$store.state.silos.dataTableMultiSiloFields,
            filter: null,
            filters: {
                delivery_number: '',
                customer_name: '',
                city_customer: '',
                new_order: '',
                remarks: '',
                fill_grade: '',
                empty_fc: '',
                date_complete_empty: '',
                feed_code: ''
            },
            items: this.$store.state.silos.dataTableMultiSiloItems,
            dropdownItems: [
                { name: "ALL", value: "all" },
                { name: "< 25", value: 25 },
                { name: "< 50", value: 50 },
                { name: "< 75", value: 75 },
                { name: ">= 75", value: 100 }
            ],
            selectedDropDownItem: { name: "ALL", value: "all" }
        }
    },
    computed: {
        filteredItems () {
            let filteredItems = this.items.filter(item => {
                return Object.keys(this.filters).every(key =>
                String(item[key]).includes(this.filters[key]))
            })

            if (this.selectedDropDownItem.value != 'all') {
                filteredItems = this.items.filter(item => {

                    if (this.selectedDropDownItem.value < 100) {
                        return item.fill_grade < this.selectedDropDownItem.value;
                    } else {
                        return item.fill_grade >= 75;
                    }
                });
            }

            return filteredItems.length > 0 ? filteredItems : [{
                delivery_number: '',
                customer_name: '',
                city_customer: '',
                new_order: '',
                remarks: '',
                fill_grade: '',
                empty_fc: '',
                date_complete_empty: '',
                feed_code: ''
            }]
        }
    },
    methods: {
        backToSelectionScreen () {
            this.$router.push('/selection-screen')
        },
        selectDropdownItem(dropdownItem) {
            this.selectedDropDownItem = dropdownItem;
        },
        updateEditedItem(row) {
            row.toggleDetails();
            var rowItem = row.item;
            var updatedTableData = [];

            for (var i = 0; i < this.items.length; i++) {
                var currentRowItem = this.items[i];
                
                if (currentRowItem.silo_number == rowItem.silo_number) {
                    updatedTableData.push(rowItem)
                } else {
                    updatedTableData.push(currentRowItem)
                }

                if (rowItem.new_order == '') {
                    rowItem.new_order = '-'
                }

                if (rowItem.remarks == '') {
                    rowItem.remarks = '-'
                }

                if (rowItem.date_complete_empty == '') {
                    rowItem.date_complete_empty = '-'
                }
                
            }

            this.$store.commit('setUpdatedSilosTableData', updatedTableData)
            this.items = this.$store.state.silos.dataTableMultiSiloItems;
        }
    },
    mounted() {
        this.items.forEach(function(element) {
            element._cellVariants = {};
            if (element.fill_grade < 10) {
                element._cellVariants.fill_grade = 'danger'
                element._cellVariants.empty_fc = 'danger'
            } else if (element.fill_grade <= 20) {
                element._cellVariants.fill_grade = 'warning'
                element._cellVariants.empty_fc = 'warning'
            }
        })
    }
}
</script>

<style lang="scss">
@import 'src/scss/mixins';
@import 'src/scss/variables';

.silo-screen-title {
    @include table-title;
}

.table-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
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

.b-table-details > td {
    padding: 0;
}

.table-input,
input[type="text"] {
    @include table-input;

    &:focus {
        border-bottom: 2px solid $table-back-button-color;
    }
}

input {
    outline: none;
}

.csv {
    width: 85px;
    height: 45px;
    background-color: $table-back-button-color;
    color: #fff;
    @include flex-center;
    text-align: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    margin-left: 10px;
    margin-bottom: 8px;
    @include box-shadow-vendors;
    @include transition-vendors(background-color 0.3s);

    &:hover {
        background-color: $table-back-button-active-color;
    }
}

.back-to-selection-screen-button {
    margin: 40px 0 40px 50px;
    background: $table-back-button-color;
    border-radius: 10px;
    @include log-out-button;

    &:active {
        background-color: $table-back-button-active-color;
    }
}

.online {
    background: green;
    @include status;
}

.offline {
    background: red;
    @include status;
}

.table-warning {
    background: orange;
    pointer-events :none;
}

.table-danger {
    background: red;
    pointer-events: none;
}

.btn.dropdown-toggle.btn-primary.btn-lg {
    width: 160px;
    background-color: $table-back-button-color;

    &:active {
        outline: none;
    }
}

.clickable-field {
    cursor: pointer;
}

.editable-input-field {
    border: none;
    line-height: 38px;
    border-bottom: 1px solid $table-back-button-color;
    background-color: transparent;
    font-size: 17px;
    padding-left: 5px;
    outline: none;
    text-align: center;
}

.dropdown-menu {
    font-size: 15px;
}

.dropdown-item {
    color: $table-back-button-color;

    &:hover {
        background-color: $table-back-button-color;
        color: #fff;
    }
}
</style>
