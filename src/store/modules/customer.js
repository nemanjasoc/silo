const state = {
    dataTableCustomerFields: [
        {
            key: "delivery_number",
            label: "Delivery number",
            sortable: true
        },
        {
            key: "customer_name",
            label: "Customer name",
            sortable: true
        },
        {
            key: "address_customer",
            label: "Address customer",
            sortable: true
        },
        {
            key: "house_number",
            label: "House number",
            sortable: true
        },
        {
            key: "zip_customer",
            label: "ZIP customer",
            sortable: true
        },
        {
            key: "city",
            label: "City",
            sortable: true
        },
        {
            key: "mobile_customer",
            label: "Mobile customer",
            sortable: true
        },
        {
            key: "silo_number",
            label: "Silo number",
            sortable: true
        },
        {
            key: "online",
            label: "Online",
            sortable: false
        },
        {
            key: "silo_id",
            label: "Silo ID",
            sortable: false
        },
        {
            key: "code_feed",
            label: "Code feed",
            sortable: true
        },
        {
            key: "feed_name",
            label: "Feed name",
            sortable: false
        },
        {
            key: "total_cap",
            label: "Total cap [Ton]",
            sortable: false
        },
        {
            key: "min_level",
            label: "Min level %",
            sortable: true
        },
        {
            key: "max_level",
            label: "Max level %",
            sortable: true
        },
        {
            key: "min_level_in_days",
            label: "Min level in days",
            sortable: true
        },
        {
            key: "max_level_in_days",
            label: "Max level in days",
            sortable: true
        },
        {   
            key: "actions",
            label: "Actions",
            sortable: false 
        }
    ],
    dataTableCustomerItems: [
        { 
            "delivery_number": 718659, 
            "customer_name": "W. Davis", 
            "address_customer": "West dry creek road", 
            "house_number": 15, 
            "zip_customer": "5527JS", 
            "city": "Healdsburg", 
            "mobile_customer": "062359011", 
            "silo_number": "#13", 
            "online": true,
            "silo_id": 960445, 
            "code_feed": 76546, 
            "feed_name": "Vita Opfok", 
            "total_cap": 27.2, 
            "min_level": "10%",
            "max_level": "20%",
            "min_level_in_days": 2,
            "max_level_in_days": 5
        },
        { 
            "delivery_number": 718659,
            "customer_name": "W. Davis", 
            "address_customer": "West dry creek road", 
            "house_number": 15, 
            "zip_customer": "5527JS", 
            "city": "Healdsburg", 
            "mobile_customer": "062359011", 
            "silo_number": "#14", 
            "online": false, 
            "silo_id": 960434, 
            "code_feed": 76546, 
            "feed_name": "Vita Lac", 
            "total_cap": 26.8, 
            "min_level": "10%",
            "max_level": "20%",
            "min_level_in_days": 2,
            "max_level_in_days": 5
        },
        { 
            "delivery_number": 61485, 
            "customer_name": "R. Miller", 
            "address_customer": "Dwight Way", 
            "house_number": 18, 
            "zip_customer": "5754PP", 
            "city": "Berkeley", 
            "mobile_customer": "062357783", 
            "silo_number": "#2", 
            "online": false, 
            "silo_id": 960478, 
            "code_feed": 8123, 
            "feed_name": "Garant D", 
            "total_cap": 13.9, 
            "min_level": "10%",
            "max_level": "20%",
            "min_level_in_days": 2,
            "max_level_in_days": 5
        },
        { 
            "delivery_number": 61485, 
            "customer_name": "R. Miller", 
            "address_customer": "Dwight Way", 
            "house_number": 18, 
            "zip_customer": "5754PP", 
            "city": "Berkeley", 
            "mobile_customer": "062357783", 
            "silo_number": "#3", 
            "online": true, 
            "silo_id": 960402, 
            "code_feed": 9123, 
            "feed_name": "Garant D", 
            "total_cap": 7.8, 
            "min_level": "10%",
            "max_level": "20%",
            "min_level_in_days": 2,
            "max_level_in_days": 5
        },
    ]
}

const mutations = {
    setCustomerItems: function (state, payload) {
        state.dataTableCustomerItems = payload;
    },
    setNewCustomerTableItem: function (state, payload) {
        state.dataTableCustomerItems = payload;
    }
}

export default {
    state,
    mutations
}
