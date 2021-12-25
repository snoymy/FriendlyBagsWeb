let dataBase = {
    baseColor:["color1", "color2"],
    customer:[
        {
            name:"customer1",
            address:"11/11 road xxx city xxx country xxx"
        },
        {
            name:"customer2",
            address:"11/11 road xxx city xxx country xxx"
        }
    ],
    order:[
        {
            date:               "2021-01-01",
            deadline:           "2021-02-01",
            name:               "customer1",
            workName:           "demo",
            paperType:          "KW",
            paperThickness:     "thick1",
            bagSize:            "ตัด1",
            bagShape:           "ตั้ง",
            bagEars:            "หูเจาะ",
            colorAmount:        1,
            color:              "color1",
            baseColorCheck:     true,
            baseColor:          "color2",
            quantity:           1,
            unit:               "กิโล",
            price:              100,
            workType:           "sell",
            pattern:            "pattern1",
            comment:            "no",
            design_id:          "",
        }
    ]
}

const getOrderHistory = (name) => {
    let filteredOrder = []
    dataBase["order"].map((order, index) => {
        if(order.name === name)
            filteredOrder = [...filteredOrder, order] 
    })
    return filteredOrder
}

const getBaseColor = () => {
   return dataBase["baseColor"] 
}

const getCustomer = () => {
    return dataBase["customer"]
}

const sentOrder = (newOrder) => {
    dataBase["order"] = [...dataBase["order"], ...newOrder]
    let newcustomer = {name: newOrder[0].name, address:newOrder[0].address}
    dataBase["customer"] = [...dataBase["customer"], newcustomer]
    console.log(dataBase["customer"])
}

export default {getBaseColor, getCustomer, getOrderHistory, sentOrder}
