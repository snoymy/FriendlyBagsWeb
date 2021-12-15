let dataBase = {
    baseColor:["color1", "color2"],
    customer:[
        {
            fname:"customer1",
            lname:"mock1",
            address:"11/11 road xxx city xxx country xxx"
        },
        {
            fname:"customer2",
            lname:"mock2",
            address:"11/11 road xxx city xxx country xxx"
        }
    ],
    order:[

    ]
}

const getBaseColor = () => {
   return dataBase["baseColor"] 
}

const getCustomer = () => {
    return dataBase["customer"]
}

export default {getBaseColor, getCustomer}
