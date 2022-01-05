let dataBase = {
    baseColor:["color1", "color2"],
    customer:[
        {
            name:"customer1",
            address:"11/11 road xxx city xxx country xxx",
            area:               "กทม 1",
        },
        {
            name:"customer2",
            address:"11/11 road xxx city xxx country xxx",
            area:               "กทม 1",
        }
    ],
    order:[
        {
            area:               "กทม 1",
            date:               "2021-01-01",
            deadline:           "2021-02-01",
            orderID:            "1234567890",
            name:               "customer1",
            workName:           "demo",
            paperType:          "KW",
            paperThickness:     "thick1",
            bagSize:            "ตัด1",
            bagShape:           "ตั้ง",
            bagEars:            "หูเจาะ",
            bagType:            "กระดาษ",
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
            sameBlock:          false,
            sameColor:          false,
            vat:                7,
            design_id:          "",
            status:             "ตรวจสอบออร์เดอร์",
            cs:                 "123450",
            edit:               "..."
        }
    ]
}

const getOrderHistory = (name) => {
    let filteredOrder = []
    if(name === "*"){
        dataBase["order"].map((order, index) => {
            order.status = "ตรวจสอบออร์เดอร์"
            filteredOrder = [...filteredOrder, order] 
        })
        return filteredOrder 
    }
    dataBase["order"].map((order, index) => {
        if(order.name === name){
            filteredOrder = [...filteredOrder, order] 
        }
            
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
