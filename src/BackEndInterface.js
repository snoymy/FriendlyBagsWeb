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
            workName:           "demo1",
            paperType:          "KW",
            paperThickness:     "thick1",
            bagSize:            "ตัด1",
            bagShape:           "ตั้ง",
            bagEars:            "หูเจาะ",
            bagType:            "กระดาษ",
            colorAmount:        1,
            color:              ["color1"],
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
            filmStatus:         "กำลังดำเนินการ",
            approveStatus:      "checking",
            cs:                 "123450",
            edit:               "...",
            blockPlateStatus:   "พร้อมใช้งาน",
        },
        {
            area:               "กทม 1",
            date:               "2021-01-01",
            deadline:           "2021-02-01",
            orderID:            "1234567890",
            name:               "customer1",
            workName:           "demo2",
            paperType:          "KW",
            paperThickness:     "thick1",
            bagSize:            "ตัด1",
            bagShape:           "ตั้ง",
            bagEars:            "หูเจาะ",
            bagType:            "กระดาษ",
            colorAmount:        1,
            color:              ["color1"],
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
            filmStatus:         "กำลังดำเนินการ",
            approveStatus:      "checking",
            cs:                 "123450",
            edit:               "...",
            blockPlateStatus:   "พร้อมใช้งาน",
        },
        {
            area:               "กทม 1",
            date:               "2021-01-01",
            deadline:           "2021-02-01",
            orderID:            "1234567890",
            name:               "customer1",
            type:               "เสื้อกล้าม",
            workName:           "demo3",
            plasticType:        "KW",
            plasticThickness:   "thick1",
            bagSize:            {length:4, width:5},
            bagShape:           "ตั้ง",
            bagEars:            "หูเจาะ",
            bagType:            "พลาสติก",
            bagMat:             "PE",
            bagSide:            "5",
            bagMatColor:        "color1",
            printFace:          "2",
            colorAmountFront:   2,
            colorFront:         ["color1","color2"],
            colorAmountBack:    2,
            colorBack:          ["color1","color2"],
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
            filmStatus:         "กำลังดำเนินการ",
            approveStatus:      "checking",
            cs:                 "123450",
            edit:               "...",
            blockPlateStatus:   "พร้อมใช้งาน",
        },
    ]
}

const getOrderHistory = (name) => {
    return new Promise(async (resolve, reject)=>{
        let fetchRes = await fetch("https://jsonplaceholder.typicode.com/todos/1").catch(err => console.log(err));
        let d = await fetchRes.json();
        console.log(d)
        let orderList = d;

        let filteredOrder = [orderList]
        resolve(filteredOrder)
        /*
        if(name === "*"){
            orderList.map((order, index) => {
                filteredOrder = [...filteredOrder, order] 
            })
            return filteredOrder 
        }
        orderList.map((order, index) => {
            if(order.name === name){
                filteredOrder = [...filteredOrder, order] 
            }
                
        })
        return filteredOrder
        */
    })
}

const getBaseColor = () => {
   return dataBase["baseColor"] 
}

const getCustomer = () => {
    return dataBase["customer"]
}

const sentNewOrder = (newOrder) => {
    dataBase["order"] = [...dataBase["order"], ...newOrder]
    let newcustomer = {name: newOrder[0].name, address:newOrder[0].address}
    dataBase["customer"] = [...dataBase["customer"], newcustomer]
    console.log(dataBase["customer"])
}

const sentEditedOrder = (editedOrder) => {
    dataBase["order"] = editedOrder
    console.log(dataBase["customer"])
}

export default {getBaseColor, getCustomer, getOrderHistory, sentNewOrder, sentEditedOrder}
