<template>
    <b-container fluid>
        <b-table
            responsive
            show-empty
            hover
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :fields="dataTableInstallationSecondFields"
            :items="filtered">

            <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">
                    <input class="table-input" v-if="field.sortable" v-model="filters[field.key]">
                </td>
            </template>

            <template slot="install_date" slot-scope="row">
                <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                    {{ row.item.install_date }}
                </span>
                <input type="text" 
                    name="install-date" 
                    class="editable-input-field" 
                    @dblclick="updateEditedItem(row)" 
                    v-if="row.detailsShowing" 
                    v-model="row.item.install_date" 
                    @keyup.enter="updateEditedItem(row)" />
            </template>

            <template slot="name_initials" slot-scope="row">
                <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                    {{ row.item.name_initials }}
                </span>
                <input type="text" 
                    name="name-initials" 
                    class="editable-input-field" 
                    @dblclick="updateEditedItem(row)" 
                    v-if="row.detailsShowing" 
                    v-model="row.item.name_initials" 
                    @keyup.enter="updateEditedItem(row)" />
            </template>
            
            <template slot="sensor_id" slot-scope="row">
                <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                    {{ row.item.sensor_id }}
                </span>
                <input type="text" 
                    name="sensor-id" 
                    class="editable-input-field" 
                    @dblclick="updateEditedItem(row)" 
                    v-if="row.detailsShowing" 
                    v-model="row.item.sensor_id" 
                    @keyup.enter="updateEditedItem(row)" />
            </template>

            <template slot="sensor_to_100_level_cm" slot-scope="row">
                <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                    {{ row.item.sensor_to_100_level_cm }}
                </span>
                <input type="text" 
                    name="sensor" 
                    class="editable-input-field" 
                    @dblclick="updateEditedItem(row)" 
                    v-if="row.detailsShowing" 
                    v-model="row.item.sensor_to_100_level_cm" 
                    @keyup.enter="updateEditedItem(row)" />
            </template>

            <template slot="tube_height_cm" slot-scope="row">
                <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                    {{ row.item.tube_height_cm }}
                </span>
                <input type="text" 
                    name="tube-height" 
                    class="editable-input-field" 
                    @dblclick="updateEditedItem(row)" 
                    v-if="row.detailsShowing" 
                    v-model="row.item.tube_height_cm" 
                    @keyup.enter="updateEditedItem(row)" />
            </template>

            <template slot="tube_diameter" slot-scope="row">
                <span class="clickable-field" @dblclick="row.toggleDetails" v-if="!row.detailsShowing" >
                    {{ row.item.tube_diameter }}
                </span>
                <input type="text" 
                    name="tube-diameter" 
                    class="editable-input-field" 
                    @dblclick="updateEditedItem(row)" 
                    v-if="row.detailsShowing" 
                    v-model="row.item.tube_diameter" 
                    @keyup.enter="updateEditedItem(row)" />
            </template>

            <template slot="row-details" slot-scope="row">
            </template>

            <template slot="online" slot-scope="row">
                <span class="online" v-if="row.item.online"></span>
                <span class="offline" v-if="!row.item.online"></span>
            </template>
        </b-table>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            sortDesc: false,
            sortBy: null,
            sortDirection: 'asc',
            dataTableInstallationSecondFields: this.$store.state.installer.dataTableInstallationSecondFields,
            filter: null,
            filters: {
                install_date: '',
                name_initials: '',
                sensor_id: '',
                sensor_to_100_level_cm: '',
                tube_height_cm: '',
                tube_diameter: ''
            },
            items: this.$store.state.installer.dataTableInstallationSecondItems
        }
    },
    computed: {
        filtered () {
            const filtered = this.items.filter(item => {
                return Object.keys(this.filters).every(key =>
                String(item[key]).includes(this.filters[key]))
            })
            return filtered.length > 0 ? filtered : [{
                install_date: '',
                name_initials: '',
                sensor_id: '',
                sensor_to_100_level_cm: '',
                tube_height_cm: '',
                tube_diameter: ''
            }]
        }
    },
    methods: {
        updateEditedItem(row) {
            row.toggleDetails();
            var rowItem = row.item;
            var updatedTableData = [];

            for (var i = 0; i < this.items.length; i++) {
                var currentRowItem = this.items[i];
                
                if (currentRowItem.sensor_id == rowItem.sensor_id) {
                    updatedTableData.push(rowItem)
                } else {
                    updatedTableData.push(currentRowItem)
                }

                if (rowItem.install_date == '') {
                    rowItem.install_date = '-'
                }

                if (rowItem.name_initials == '') {
                    rowItem.name_initials = '-'
                }

                if (rowItem.sensor_id == '') {
                    rowItem.sensor_id = '-'
                }

                if (rowItem.sensor_to_100_level_cm == '') {
                    rowItem.sensor_to_100_level_cm = '-'
                }

                if (rowItem.tube_height_cm == '') {
                    rowItem.tube_height_cm = '-'
                }

                if (rowItem.tube_diameter == '') {
                    rowItem.tube_diameter = '-'
                }
                
            }

            this.$store.commit('setUpdatedInstallationTableData', updatedTableData)
            this.items = this.$store.state.installer.dataTableInstallationSecondItems;
        }
    }
}
</script>

<style lang="scss">
@import 'src/scss/mixins';
@import 'src/scss/variables';

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
    margin-top: 40px;
}

.table.b-table > thead > tr > th[aria-sort]::before, .table.b-table > tfoot > tr > th[aria-sort]::before {
    @include sort-arrow;
}

.table-input,
input[type="text"],
input[type="number"] {
    @include table-input;

    &:focus {
        border-bottom: 2px solid $table-back-button-color;
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

.clickable-field {
    cursor: pointer;
}
</style>
