<template>
    <b-container fluid>
        <div class="header-wrapper">
            <div class="master-data-customer-title">Master Data Screen customer</div>
            <div class="add">
                <div class="add-button" v-b-modal.table @click="resetAndShowAddModal()"><i class="fa fa-plus-circle" aria-hidden="true"></i>Add</div>

                <div v-if="addModal">
                    <b-modal id="table" ref="modal" title="Add item" @ok="handleAddOk" hide-footer>
                        <form ref="form" @submit.stop.prevent="submitAdd">
                            <b-form-group label="Delivery number:" label-for="delivery-number">
                                <b-form-input type="number" id="delivery-number" v-model="customerObj.delivery_number" required></b-form-input>
                            </b-form-group>
                                        
                            <b-form-group label="Customer name:" label-for="customer-name">
                                <b-form-input type="text" id="customer-name" v-model="customerObj.customer_name" required></b-form-input>  
                            </b-form-group>
                                        
                            <b-form-group label="Adress customer:" label-for="adress-customer">
                                <b-form-input type="text" id="adress-customer" v-model="customerObj.address_customer" required></b-form-input>  
                            </b-form-group>
                                        
                            <b-form-group label="House number:" label-for="house-number">
                                <b-form-input type="number" id="house-number" v-model="customerObj.house_number" required></b-form-input> 
                            </b-form-group>
                                        
                            <b-form-group label="ZIP customer:" label-for="zip-customer">
                                <b-form-input type="text" id="zip-customer" v-model="customerObj.zip_customer" required></b-form-input>
                            </b-form-group>
                                        
                            <b-form-group label="City:" label-for="city">
                                <b-form-input type="text" id="city" v-model="customerObj.city" required></b-form-input>
                            </b-form-group>
                                        
                            <b-form-group label="Mobile customer:" label-for="mobile-customer">
                                <b-form-input type="number" id="mobile-customer" v-model="customerObj.mobile_customer" required></b-form-input>
                            </b-form-group>    
                                                
                            <b-form-group label="Silo number:" label-for="silo-naam">
                                <b-form-input type="text" id="silo-naam" v-model="customerObj.silo_number" required></b-form-input>
                            </b-form-group>

                            <b-form-group label="Silo id:" label-for="silo-id">
                                <b-form-input type="number" id="silo-id" v-model="customerObj.silo_id" required></b-form-input>
                            </b-form-group>        
                                            
                            <b-form-group label="Code feed:" label-for="code-feed">             
                                <b-form-input type="number" id="code-feed" v-model="customerObj.code_feed" required></b-form-input>  
                            </b-form-group>
                                        
                            <b-form-group label="Min Level %:" label-for="min-level">
                                <b-form-input type="text" id="min-level" v-model="customerObj.min_level" required></b-form-input>
                            </b-form-group>      
                                                        
                            <b-form-group label="Max Level %:" label-for="max-level">      
                                <b-form-input type="text" id="max-level" v-model="customerObj.max_level" required></b-form-input>  
                            </b-form-group>
                                            
                            <b-form-group label="Min Level in days:" label-for="min-level-in-days">
                                <b-form-input type="number" id="min-level-in-days" v-model="customerObj.min_level_in_days" required></b-form-input>
                            </b-form-group>       
                                                    
                            <b-form-group label="Max Level in days:" label-for="max-level-in-days">
                                <b-form-input type="number" id="max-level-in-days" v-model="customerObj.max_level_in_days" required></b-form-input>
                            </b-form-group>

                            <div class="modal-buttons">
                                <b-button size="sm" variant="danger" @click="hideModal">Cancel</b-button>
                                <b-button type="submit" size="sm" variant="success">Add</b-button>                           
                            </div>       
                        </form>          
                    </b-modal>
                </div>

                <div v-if="editModal">
                    <b-modal id="table" ref="modal" title="Edit item" @ok="handleEditOk" hide-footer>
                        <form ref="form" @submit.stop.prevent="submitEdit">
                            <b-form-group label="Delivery number:" label-for="delivery-number">
                                <b-form-input type="number" id="delivery-number" v-model="customerObj.delivery_number" required></b-form-input>
                            </b-form-group>
                                            
                            <b-form-group label="Customer name:" label-for="customer-name">
                                <b-form-input type="text" id="customer-name" v-model="customerObj.customer_name" required></b-form-input>  
                            </b-form-group>                    
                        
                            <b-form-group label="Adress customer:" label-for="adress-customer">
                                <b-form-input type="text" id="adress-customer" v-model="customerObj.address_customer" required></b-form-input>  
                            </b-form-group>
                                            
                            <b-form-group label="House number:" label-for="house-number">
                                <b-form-input type="number" id="house-number" v-model="customerObj.house_number" required></b-form-input> 
                            </b-form-group>
                                            
                            <b-form-group label="ZIP customer:" label-for="zip-customer">
                                <b-form-input type="text" id="zip-customer" v-model="customerObj.zip_customer" required></b-form-input>
                            </b-form-group>
                                            
                            <b-form-group label="City:" label-for="city">
                                <b-form-input type="text" id="city" v-model="customerObj.city" required></b-form-input>
                            </b-form-group>
                                            
                            <b-form-group label="Mobile customer:" label-for="mobile-customer">
                                <b-form-input type="number" id="mobile-customer" v-model="customerObj.mobile_customer" required></b-form-input>
                            </b-form-group>    
                                                    
                            <b-form-group label="Silo number:" label-for="silo-naam">
                                <b-form-input type="text" id="silo-naam" v-model="customerObj.silo_number" required></b-form-input>
                            </b-form-group>

                            <b-form-group label="Silo id:" label-for="silo-id">
                                <b-form-input readonly type="number" id="silo-id" v-model="customerObj.silo_id" required></b-form-input>
                            </b-form-group>        
                                            
                            <b-form-group label="Code feed:" label-for="code-feed">             
                                <b-form-input type="number" id="code-feed" v-model="customerObj.code_feed" required></b-form-input>  
                            </b-form-group>
                                            
                            <b-form-group label="Min Level %:" label-for="min-level">
                                <b-form-input type="text" id="min-level" v-model="customerObj.min_level" required></b-form-input>
                            </b-form-group>      
                                                        
                            <b-form-group label="Max Level %:" label-for="max-level">      
                                <b-form-input type="text" id="max-level" v-model="customerObj.max_level" required></b-form-input>  
                            </b-form-group>
                                            
                            <b-form-group label="Min Level in days:" label-for="min-level-in-days">
                                <b-form-input type="number" id="min-level-in-days" v-model="customerObj.min_level_in_days" required></b-form-input>
                            </b-form-group>                                       
                        
                            <b-form-group label="Max Level in days:" label-for="max-level-in-days">
                                <b-form-input type="number" id="max-level-in-days" v-model="customerObj.max_level_in_days" required></b-form-input>
                            </b-form-group>

                            <div class="modal-buttons">
                                <b-button size="sm" variant="danger" @click="hideModal">Cancel</b-button>
                                <b-button type="submit" size="sm" variant="success">Save</b-button>                                
                            </div>       
                        </form>           
                    </b-modal> 
                </div>          
                
                <b-modal v-model="deleteModalShow" title="Delete item">
                    <span class="alert-delete">Are you sure you want to delete this row?</span>
                    <template slot="modal-footer" slot-scope="{ cancel, ok }">
                        <b-button size="sm" variant="danger" @click="cancel()">
                            Cancel
                        </b-button>   
                        <b-button size="sm" variant="success" @click="ok();deleteCustomerRow(rowTempItem)">
                            Ok
                        </b-button>
                    </template>
                </b-modal>
            </div>
        </div>

        <b-table
            responsive
            show-empty
            hover
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :fields="dataTableCustomerFields"
            :items="filtered">

            <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">
                    <input class="table-input" v-if="field.sortable" v-model="filters[field.key]">
                </td>
            </template>

            <template slot="online" slot-scope="row">
                <span class="online" v-if="row.item.online"></span>
                <span class="offline" v-if="!row.item.online"></span>
            </template>

            <template slot="actions" slot-scope="row">
                <div class="actions">
                    <div class="edit-button" v-b-modal.table @click="fillAndShowEditModal(row.item)" :key="row.item.silo_number">
                        <i class="fa fa-pencil" aria-hidden="true">
                            <span class="edit-tooltiptext">Edit</span>
                        </i>
                    </div>
        
                    <div class="delete-button" @click="switchDeleteModal(row.item)">
                        <i class="fa fa-trash-o" aria-hidden="true">
                            <span class="delete-tooltiptext">Delete</span>
                        </i>
                    </div>
                </div>
            </template>
        </b-table>
        <div class="back-to-feeder-selection-button" @click="backToSelectionScreen">Back</div>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            sortDesc: false,
            sortBy: null,
            sortDesc: false,
            sortDirection: 'asc',
            dataTableCustomerFields: this.$store.state.customer.dataTableCustomerFields,
            filter: null,
            filters: {
                delivery_number: '',
                customer_name: '',
                address_customer: '',
                house_number: '',
                zip_customer: '',
                city: '',
                mobile_customer: '',
                silo_number: '',
                code_feed: '',
                min_level: '',
                max_level: '',
                min_level_in_days: '',
                max_level_in_days: ''
            },
            customerObj: {
                delivery_number: '',
                customer_name: '',
                address_customer: '',
                house_number: '',
                zip_customer: '',
                city: '',
                mobile_customer: '',
                silo_number: '',
                silo_id: '',
                code_feed: '',
                min_level: '',
                max_level: '',
                min_level_in_days: '',
                max_level_in_days: ''
            },
            items: this.$store.state.customer.dataTableCustomerItems,
            rowTempItem: null,
            addModal: false,
            editModal: false,
            deleteModalShow: false
        }
    },
    computed: {
        filtered () {
            const filtered = this.items.filter(item => {
                return Object.keys(this.filters).every(key =>
                String(item[key]).includes(this.filters[key]))
            })
            return filtered.length > 0 ? filtered : [{
                delivery_number: '',
                customer_name: '',
                address_customer: '',
                house_number: '',
                zip_customer: '',
                city: '',
                mobile_customer: '',
                silo_number: '',
                code_feed: '',
                min_level: '',
                max_level: '',
                min_level_in_days: '',
                max_level_in_days: ''
            }]
        }
    },
    methods: {
        backToSelectionScreen () {
            this.$router.push('/selection-screen');
        },
        deleteCustomerRow (rowItem) {
            var newTableData = [];

            for (var i = 0; i < this.items.length; i++ ) {
                var currentRowItem = this.items[i];

                if (currentRowItem.silo_id != rowItem.silo_id) {
                    newTableData.push(currentRowItem)
                }
            }

            this.$store.commit('setCustomerItems', newTableData);
            this.items = this.$store.state.customer.dataTableCustomerItems;
        },
        updateCustomerTable() {
            var newCustomerObj = Object.assign({}, this.customerObj);
            var updatedTableData = [];

            for (var i = 0; i < this.items.length; i++) {
                var currentRowItem = this.items[i];
                
                if (currentRowItem.silo_id == newCustomerObj.silo_id) {
                    updatedTableData.push(newCustomerObj)
                } else {
                    updatedTableData.push(currentRowItem)
                }
                
            }

            this.$store.commit('setCustomerItems', updatedTableData)
            this.items = this.$store.state.customer.dataTableCustomerItems;
        },
        addNewCustomerItem() {
            if (this.isSiloIdUnique()) {
                var newCustomerObj = Object.assign({}, this.customerObj);

                this.items.push(newCustomerObj);
                this.$store.commit('setNewCustomerTableItem', this.items);
            }
        },
        isSiloIdUnique() {
            var findCustomerItemBySiloId = this.items.find(item => item.silo_id == this.customerObj.silo_id);

            if (findCustomerItemBySiloId) {
                alert(`Silo id ${findCustomerItemBySiloId.silo_id} already exists!`)
            }

            return findCustomerItemBySiloId == null || findCustomerItemBySiloId == undefined;
        },
        resetCustomerObj() {
            this.customerObj = {
                delivery_number: '',
                customer_name: '',
                address_customer: '',
                house_number: '',
                zip_customer: '',
                city: '',
                mobile_customer: '',
                silo_number: '',
                silo_id: '',
                code_feed: '',
                min_level: '',
                max_level: '',
                min_level_in_days: '',
                max_level_in_days: ''
            }
        },
        resetAndShowAddModal() {
            this.resetCustomerObj();
            this.addModal = true;
            this.editModal = false;
        },
        fillAndShowEditModal(rowItem) {
            Object.assign(this.customerObj, rowItem);
            this.editModal = true;
            this.addModal = false;
        },
        switchDeleteModal(rowItem) {
            this.rowTempItem = rowItem;
            this.deleteModalShow = !this.deleteModalShow;
        },
        handleAddOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.submitAdd();
        },
        submitAdd() {
            this.addNewCustomerItem();
            this.$nextTick(() => {
                this.$refs.modal.hide()
            })
        },
        handleEditOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.submitEdit();
        },
        submitEdit() {
            this.updateCustomerTable();
            this.$nextTick(() => {
                this.$refs.modal.hide()
            })
        },
        hideModal() {
            this.$refs['modal'].hide()
        }
    }
}
</script>

<style lang="scss">
@import 'src/scss/mixins';
@import 'src/scss/variables';

.header {
    @include header;
}

.master-data-customer-title {
    @include header-title;
}

.add-button {
    @include add-button;

    &:hover {
        background-color:#34a349;
        cursor: pointer;
    }
}

.fa-plus-circle {
    margin-right: 5px;
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

.back-to-feeder-selection-button {
    margin: 40px 50px 40px 0px;
    background: $table-back-button-color;
    border-radius: 10px;
    margin-left: 50px;
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

.actions {
    @include flex-center;
}

.fa-pencil {
    @include edit-pencil;

    &:hover .edit-tooltiptext {
        visibility: visible;
    }
}

.fa-pencil .edit-tooltiptext {
    @include edit-tooltip;

    &::after {
        @include edit-tooltip-after;
    }
}

.fa-trash-o {
    @include trash-delete;

    &:hover .delete-tooltiptext {
        visibility: visible;
    }
}

.fa-trash-o .delete-tooltiptext {
    @include delete-tooltip;

    &::after {
        @include delete-tooltip-after;
    }
}

.table-input {
    @include table-input;

    &:focus {
        border-bottom: 2px solid $table-back-button-color;
    }
}

input[type="text"],
input[type="number"] {
    @include input-text-number;
}

.btn-primary {
    display: none;
}

.modal-content,
.modal-header {
    max-width: 420px;
    width: 100%;
}

.modal-body {
    @include modal-body;
}

.form-group {
    width: 340px;
}

.form-control {
    border-radius: 0;
}

.modal-footer > :not(:last-child) {
    width: 80px;
}

.modal-footer > :not(:first-child) {
    width: 80px;
    margin-right: 20px;
}

.alert-delete {
    margin-left: -80px;
}

.modal-buttons {
    @include modal-buttons;
}

.btn-success,
.btn-danger {
    width: 85px;
    height: 32px;
}

.btn-danger {
    margin-right: 8px;
}
</style>
