const state = {
    dataTableMultiSiloFields: [
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
            key: "adress_customer",
            label: "Adress customer",
            sortable: false
        },
        {
            key: "house_number",
            label: "House number",
            sortable: false
        },
        {
            key: "city_customer",
            label: "City customer",
            sortable: true
        },
        {
            key: "mobile_customer",
            label: "Mobile customer",
            sortable: false
        },
        {
            key: "silo_number",
            label: "Silo number",
            sortable: false
        },
        {
            key: "free_cap",
            label: "Free cap [Ton]",
            sortable: false
        },
        {
            key: "total_cap",
            label: "Total Cap [Ton]",
            sortable: false
        },
        {
            key: "new_order",
            label: "New order",
            sortable: true,
            _showDetails: true
        },
        {
            key: "remarks",
            label: "Remarks",
            sortable: true,
            _showDetails: true
        },
        {
            key: "fill_grade",
            label: "Fill grade",
            dropable: true
        },
        {
            key: "empty_fc",
            label: "Empty F/C",
            sortable: false
        },
        {
            key: "date_complete_empty",
            label: "Date complete empty",
            sortable: true,
            _showDetails: true
        },
        {
            key: "number_of_silo_fills_after_complete_empty",
            label: "Number of silo fills after complete empty",
            sortable: false
        },
        {
            key: "online",
            label: "Online",
            sortable: false
        },
        {
            key: "feed_code",
            label: "Feed code",
            sortable: true
        },
        {
            key: "last_delivery",
            label: "Last delivery",
            sortable: false
        },
        {
            key: "silo_id",
            label: "Silo ID",
            sortable: false
        },
        {   
            key: "actions",
            label: "Actions",
            sortable: false 
        }
    ],
    dataTableMultiSiloItems: [
        { 
            "delivery_number": 718659, 
            "customer_name": "W. Davis", 
            "adress_customer": "West dry creek road", 
            "house_number": 15, 
            "city_customer": "Healdsburg", 
            "mobile_customer": "06123456", 
            "silo_number": "#13",
            "free_cap": 3.3,
            "total_cap": 27.2,
            "new_order": "-",
            "remarks": "Sept overzetten naar Vita Max",
            "fill_grade": 88,
            "empty_fc": "18-9-19 AM",
            "date_complete_empty": "-",
            "number_of_silo_fils_after_complete_empty": 4,
            "online": false,
            "feed_code": 76546,
            "last_delivery": "15-9-19 AM",
            "silo_id": 960445
        },
        {
            "delivery_number": 718659, 
            "customer_name": "W. Davis", 
            "adress_customer": "West dry creek road", 
            "house_number": 15, 
            "city_customer": "Healdsburg", 
            "mobile_customer": "06123456", 
            "silo_number": "#14",
            "free_cap": 15.0,
            "total_cap": 26.8,
            "new_order": "3-JvD",
            "remarks": "",
            "fill_grade": 44,
            "empty_fc": "22-9-19 AM",
            "date_complete_empty": "21-9-2019",
            "number_of_silo_fils_after_complete_empty": 9,
            "online": false,
            "feed_code": 76546,
            "last_delivery": "13-9-19 AM",
            "silo_id": 960434
        },
        {
            "delivery_number": 61485, 
            "customer_name": "R. Miller", 
            "adress_customer": "Dwight Way", 
            "house_number": 18, 
            "city_customer": "Berkeley", 
            "mobile_customer": "06654321", 
            "silo_number": "#2",
            "free_cap": 6.3,
            "total_cap": 13.9,
            "new_order": "-",
            "remarks": "",
            "fill_grade": 19,
            "empty_fc": "20-9-19 AM",
            "date_complete_empty": "-",
            "number_of_silo_fils_after_complete_empty": 11,
            "online": true,
            "feed_code": 8123,
            "last_delivery": "13-9-19 AM",
            "silo_id": 960402
        },
        {
            "delivery_number": 61485, 
            "customer_name": "R. Miller", 
            "adress_customer": "Dwight Way", 
            "house_number": 18, 
            "city_customer": "Berkeley", 
            "mobile_customer": "06654321", 
            "silo_number": "#3",
            "free_cap": 7.4,
            "total_cap": 7.8,
            "new_order": "-",
            "remarks": "",
            "fill_grade": 5,
            "empty_fc": "18-9-19 PM",
            "date_complete_empty": "-",
            "number_of_silo_fils_after_complete_empty": 3,
            "online": true,
            "feed_code": 9123,
            "last_delivery": "11-9-19 AM",
            "silo_id": 960402
        }
    ]
}

const mutations = {
    setUpdatedSilosTableData: function (state, payload) {
        state.dataTableMultiSiloItems = payload;
    }
}

export default {
    state,
    mutations
}