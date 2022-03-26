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

/*
if(sever...mothondd == "GET")
{
    array([])
}
*/

const getOrderHistory = (name) => {
    return new Promise(async (resolve, reject)=>{
        let fetchRes = await fetch("http://localhost:80/api/getOrder.php").catch(err => console.log(err));
        console.log(fetchRes);
        let d 
        try {
            d = await fetchRes.json();
        } catch (error) {
            d = []
            reject(d)
        }
        console.log(d)
        let orderList = d;

        let filteredOrder = []
        
        if(name === "*"){
            orderList.map((order, index) => {
                filteredOrder = [...filteredOrder, order] 
            })
            resolve(filteredOrder)
        }
        orderList.map((order, index) => {
            if(order.name === name){
                filteredOrder = [...filteredOrder, order] 
            }
                
        })
        resolve(filteredOrder)
    })
}

const getPCM = (num) => {
    return new Promise(async (resolve, reject)=>{
        let fetchRes = await fetch("http://localhost:8626/api/v1/company/addCompany" + "?pcm=" + num, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json',
            },
        } 
        ).catch(err => console.log("post error", err));
        console.log(fetchRes);
        let d 
        try {
            d = await fetchRes.json();
        } catch (error) {
            d = []
            reject(d)
        }
        console.log(d)

        resolve(d)
    })
}

const getMC = (num) => {
    return new Promise(async (resolve, reject)=>{
        let fetchRes = await fetch("http://localhost:8626/api/v1/company/addCompany" + "?mc=" + num, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json',
            },
        } 
        ).catch(err => console.log("post error", err));
        console.log(fetchRes);
        let d 
        try {
            d = await fetchRes.json();
        } catch (error) {
            d = []
            reject(d)
        }
        console.log(d)

        resolve(d)
    })
}

const getColor = () => {
    return new Promise(async (resolve, reject)=>{
        let fetchRes = await fetch("http://localhost:80/api/getOrder.php").catch(err => console.log(err));
        console.log(fetchRes);
        let d 
        try {
            d = await fetchRes.json();
        } catch (error) {
            d = []
            reject(d)
        }
        console.log(d)

        resolve(d)
    })
}

const getMatColor = () => {
    return new Promise(async (resolve, reject)=>{
        let fetchRes = await fetch("http://localhost:80/api/getOrder.php").catch(err => console.log(err));
        console.log(fetchRes);
        let d 
        try {
            d = await fetchRes.json();
        } catch (error) {
            d = []
            reject(d)
        }
        console.log(d)

        resolve(d)
    })
}

const getCustomer = () => {
    return new Promise(async (resolve, reject)=>{
        let fetchRes = await fetch("http://localhost:80/api/getOrder.php").catch(err => console.log(err));
        console.log(fetchRes);
        let d 
        try {
            d = await fetchRes.json();
        } catch (error) {
            d = []
            reject(d)
        }

        resolve(d)
    })
}

const sentNewOrder = (newOrder) => {
    return new Promise(async (resolve, reject)=>{
        console.log("order", newOrder);
        let fetchRes = await fetch("http://localhost:8626/api/v1/company/addCompany" , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder)
        } 
        ).catch(err => console.log("post error", err));

        let d = await fetchRes.json();

        resolve(d)
    })
    /*
    dataBase["order"] = [...dataBase["order"], ...newOrder]
    let newcustomer = {name: newOrder[0].name, address:newOrder[0].address}
    dataBase["customer"] = [...dataBase["customer"], newcustomer]
    console.log(dataBase["customer"])
    */
}

const sentEditedOrder = (editedOrder) => {
    dataBase["order"] = editedOrder
    console.log(dataBase["customer"])
}

export default {getColor, getMatColor, getCustomer, getOrderHistory, getMC, getPCM, sentNewOrder, sentEditedOrder}