const state = {
    dataTableInstallationFirstFields: [
        {
            key: "customer_name",
            label: "Customer name",
            sortable: true
        },
        {
            key: "mobile_customer",
            label: "Mobile customer",
            sortable: true
        },
        {
            key: "address_customer",
            label: "Adress customer",
            sortable: true
        },
        {
            key: "zip_code_customer",
            label: "ZIP Code customer",
            sortable: true
        },
        {
            key: "city",
            label: "City",
            sortable: true
        },
        {
            key: "silo_number",
            label: "Silo number",
            sortable: true
        }
    ],
    dataTableInstallationFirstItems: [
        { 
            "customer_name": "W. Davis", 
            "mobile_customer": "062359011", 
            "address_customer": "West dry creek road 15", 
            "zip_code_customer": "5527JS", 
            "city": "Healdsburg", 
            "silo_number": "#13", 
        },
        {
            "customer_name": "W. Davis", 
            "mobile_customer": "062359011", 
            "address_customer": "West dry creek road 15", 
            "zip_code_customer": "5527JS", 
            "city": "Healdsburg", 
            "silo_number": "#14", 
        },
        {
            "customer_name": "R. Miller", 
            "mobile_customer": "062357783", 
            "address_customer": "Dwight Way 18", 
            "zip_code_customer": "5754PP", 
            "city": "Berkeley", 
            "silo_number": "#2", 
        },
        {
            "customer_name": "R. Miller", 
            "mobile_customer": "062357783", 
            "address_customer": "Dwight Way 18", 
            "zip_code_customer": "5754PP", 
            "city": "Berkeley", 
            "silo_number": "#3", 
        },
    ],
    dataTableInstallationSecondFields: [
        {
            key: "install_date",
            label: "Install date",
            sortable: true,
            _showDetails: true
        },
        {
            key: "name_initials",
            label: "Name initials",
            sortable: true,
            _showDetails: true
        },
        {
            key: "sensor_id",
            label: "Sensor ID",
            sortable: true,
            _showDetails: true
        },
        {
            key: "sensor_to_100_level_cm",
            label: "Sensor to 100% level [cm]",
            sortable: true,
            _showDetails: true
        },
        {
            key: "tube_height_cm",
            label: "Tube height [cm]",
            sortable: true,
            _showDetails: true
        },
        {
            key: "tube_diameter",
            label: "Tube diameter [cm]",
            sortable: true,
            _showDetails: true
        },
        {
            key: "tube_m3",
            label: "Tube [m3]",
            sortable: false
        },
        {
            key: "funnel_m3",
            label: "Funnel [m3]",
            sortable: false
        },
        {
            key: "online",
            label: "Online",
            sortable: false
        },
        {
            key: "sensor_cm",
            label: "Sensor [cm]",
            sortable: false
        }
    ],
    dataTableInstallationSecondItems: [
        {
            "install_date": "21-6-19",
            "name_initials": "PV",
            "sensor_id": "960445",
            "sensor_to_100_level_cm": 45,
            "tube_height_cm": 5500,
            "tube_diameter": 280,
            "tube_m3": 33.88,
            "funnel_m3": 4.97,
            "online": true,
            "sensor_cm": 138
        },
        {
            "install_date": "21-6-19",
            "name_initials": "PV",
            "sensor_id": "960434",
            "sensor_to_100_level_cm": 53,
            "tube_height_cm": 5400,
            "tube_diameter": 280,
            "tube_m3": 33.26,
            "funnel_m3": 4.97,
            "online": true,
            "sensor_cm": 524
        },
        {
            "install_date": "19-6-19",
            "name_initials": "PV",
            "sensor_id": "960478",
            "sensor_to_100_level_cm": 78,
            "tube_height_cm": 4600,
            "tube_diameter": 250,
            "tube_m3": 16.33,
            "funnel_m3": 3.55,
            "online": true,
            "sensor_cm": 326
        },
        {
            "install_date": "19-6-19",
            "name_initials": "PV",
            "sensor_id": "960402",
            "sensor_to_100_level_cm": 61,
            "tube_height_cm": 3400,
            "tube_diameter": 190,
            "tube_m3": 9.66,
            "funnel_m3": 1.54,
            "online": false,
            "sensor_cm": 458
        }
    ]
}

const mutations = {
    setUpdatedInstallationTableData: function (state, payload) {
        state.dataTableInstallationSecondItems = payload;
    }
}

export default {
    state,
    mutations
}
