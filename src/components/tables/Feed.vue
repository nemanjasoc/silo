<template>
    <b-container fluid>
        <div class="header-wrapper">
            <div class="master-data-feed-title">Master Data Screen feed</div>
            <div class="add">
                <div class="add-button" v-b-modal.table @click="resetAndShowAddModal()"><i class="fa fa-plus-circle" aria-hidden="true"></i>Add</div>

                <div v-if="addModal">
                    <b-modal id="table" ref="modal" title="Add item" @ok="handleAddOk" hide-footer>
                        <form ref="form" @submit.stop.prevent="submitAdd">
                            <b-form-group label="Code [Voer]:" label-for="code-voer">
                                <b-form-input type="number" id="code-voer" v-model="feedObj.code_voer" required></b-form-input>
                            </b-form-group>

                            <b-form-group label="Description:" label-for="description">
                                <b-form-input type="text" id="description" v-model="feedObj.description" required></b-form-input>
                            </b-form-group>
                            
                            <b-form-group label="Specific Weight [kg/m3]:" label-for="specific-weight">
                                <b-form-input type="number" id="specific-weight" v-model="feedObj.specific_weight_kg_m3" required></b-form-input>
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
                            <b-form-group label="Code [Voer]:" label-for="code-voer">
                                <b-form-input readonly type="number" id="code-voer" v-model="feedObj.code_voer" required></b-form-input>
                            </b-form-group>

                            <b-form-group label="Description:" label-for="description">
                                <b-form-input type="text" id="description" v-model="feedObj.description" required></b-form-input>
                            </b-form-group>
                    
                            <b-form-group label="Specific Weight [kg/m3]:" label-for="specific-weight">
                                <b-form-input type="number" id="specific-weight" v-model="feedObj.specific_weight_kg_m3" required></b-form-input>
                            </b-form-group>

                            <div class="modal-buttons">
                                <b-button size="sm" variant="danger" @click="hideModal">Cancel</b-button>
                                <b-button type="submit" size="sm" variant="success">Save</b-button>                               
                            </div>
                        </form>
                    </b-modal>
                </div>
        
                <b-modal title="Delete item" v-model="deleteModalShow">
                    <span class="alert-delete">Are you sure you want to delete this row?</span>
                    <template slot="modal-footer" slot-scope="{ cancel, ok }">
                        <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>   
                        <b-button size="sm" variant="success" @click="ok();deleteFeederRow(rowTempItem)">Ok</b-button>
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
            :fields="dataTableFeedFields"
            :items="filtered">

            <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">
                    <input class="table-input" v-if="field.sortable" v-model="filters[field.key]">
                </td>
            </template>

            <template slot="actions" slot-scope="row">
                <div class="actions">              
                    <div class="edit-button" v-b-modal.table @click="fillAndShowEditModal(row.item)">
                        <i class="fa fa-pencil" aria-hidden="true"><span class="edit-tooltiptext">Edit</span></i>
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
            sortDirection: 'asc',
            dataTableFeedFields: this.$store.state.feed.dataTableFeedFields,
            filter: null,
            filters: {
                code_voer: '',
                description: '',
                specific_weight_kg_m3: ''
            },
            items: this.$store.state.feed.dataTableFeedItems,
            feedObj: {
                code_voer: '',
                description: '',
                specific_weight_kg_m3: ''
            },
            rowTempItem: null,
            addModal: false,
            editModal: false,
            deleteModalShow: false
        }
    },
    computed: {
        filtered () {
            let filtered = this.items.filter(item => {
                return Object.keys(this.filters).every(key =>
                String(item[key]).includes(this.filters[key]))
            })
            return filtered.length > 0 ? filtered : [{
                code_voer: '',
                description: '',
                specific_weight_kg_m3: ''
            }]
        }
    },
    methods: {
        backToSelectionScreen() {
            this.$router.push('/selection-screen');
        },
        deleteFeederRow(rowItem) {
            var newTableData = [];

            for (var i = 0; i < this.items.length; i++ ) {
                var currentRowItem = this.items[i];

                if (currentRowItem.code_voer != rowItem.code_voer) {
                    newTableData.push(currentRowItem)
                }
            }

            this.$store.commit('setFeedItems', newTableData);
            this.items = this.$store.state.feed.dataTableFeedItems;
        },
        updateFeedTable() {
            var newFeedObj = Object.assign({}, this.feedObj);
            var updatedTableData = [];
        
            for (var i = 0; i < this.items.length; i++) {
                var currentRowItem = this.items[i];
                
                if (currentRowItem.code_voer == newFeedObj.code_voer) {
                    updatedTableData.push(newFeedObj)
                } else {
                    updatedTableData.push(currentRowItem)
                }
                
            }

            this.$store.commit('setFeedItems', updatedTableData);
            this.items = this.$store.state.feed.dataTableFeedItems;
        },
        addNewFeedItem() {
            if (this.isCodeVoerUnique()) {
                var newFeedObj = Object.assign({}, this.feedObj)

                this.items.push(newFeedObj);
                this.$store.commit('setNewFeedTableItem', this.items);
            }
        },
        isCodeVoerUnique() {
            var findFeedItemByCodeVoer = this.items.find(item => item.code_voer == this.feedObj.code_voer);
            if (findFeedItemByCodeVoer) {
                alert (`Code voer ${findFeedItemByCodeVoer.code_voer} already exists!`);
            }

            return findFeedItemByCodeVoer === null || findFeedItemByCodeVoer === undefined;
        },
        resetFeedObj() {
            this.feedObj = {
                code_voer: '',
                description: '',
                specific_weight_kg_m3: ''
            }
        },
        resetAndShowAddModal() {
            this.resetFeedObj();
            this.addModal = true;
            this.editModal = false;
        },
        fillAndShowEditModal(rowItem) {
            Object.assign(this.feedObj, rowItem);
            this.editModal = true;
            this.addModal = false;
        },
        switchDeleteModal(rowItem) {
            this.rowTempItem = rowItem;
            this.deleteModalShow = !this.deleteModalShow;
        },
        submitAdd() {
            this.addNewFeedItem();
            this.$nextTick(() => {
                this.$refs.modal.hide()
            })
        },
        handleAddOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.submitAdd();
        },
        submitEdit() {
            this.updateFeedTable();
            this.$nextTick(() => {
                this.$refs.modal.hide()
            })
        },
        handleEditOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.submitEdit();
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

.header-wrapper {
    @include header;
}

.master-data-feed-title {
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
    margin: 40px 0 40px 50px;
    background: $table-back-button-color;
    border-radius: 10px;
    @include log-out-button;

    &:active {
        background-color: $table-back-button-active-color;
    }
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

input {
    outline: none;
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
