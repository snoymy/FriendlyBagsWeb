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

    ]
}

const getBaseColor = () => {
   return dataBase["baseColor"] 
}

const getCustomer = () => {
    return dataBase["customer"]
}

export default {getBaseColor, getCustomer}
