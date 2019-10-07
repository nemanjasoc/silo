const state = {
    dataTableFeedFields: [
        {
            key: "code_voer",
            label: "Code [Voer]",
            sortable: true
        },
        {
            key: "description",
            label: "Description",
            sortable: true
        },
        {
            key: "specific_weight_kg_m3",
            label: "Specific weight [kg/m3]",
            sortable: true
        },
        {   
            key: "actions",
            label: "Actions",
            sortable: false 
        }
    ],
    dataTableFeedItems: [
        {
            "code_voer": 7760,
            "description": "Vitamax opfok Amino + Ko",
            "specific_weight_kg_m3": 695
        },
        {
            "code_voer": 7930,
            "description": "Vitamax Lacto + Ko",
            "specific_weight_kg_m3": 700
        },
        {
            "code_voer": 7863,
            "description": "Garant Dracht Amino ++ Ko",
            "specific_weight_kg_m3": 705
        }
    ]
}

const mutations = {
    setFeedItems: function (state, payload) {
        state.dataTableFeedItems = payload;
    },
    setNewFeedTableItem: function (state, payload) {
        state.dataTableFeedItems = payload;
    }
}

export default {
    state,
    mutations
}
