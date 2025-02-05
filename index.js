{const menu = [
    {
        name:"Margherita",
        price:8 ,  
    },
    {
        name:"Pepperoni",
        price:8 ,  
    },
    {
        name:"Hawaina",
        price:8 ,  
    },
    {
        name:"Veggie",
        price:8 ,  
    }  
]

let cashInRegister = 100

const orderQueue = []

const addNewPizza = (newPizza)=>{
    menu.push(newPizza);
}
let OrderId = 0;
// addNewPizza({name:"Chicken",
//         price:8 ,  }
//     )

const placeOrder= (PizzaName)=>{
    const orderrdPizza = menu.find(pizza=>pizza.name === PizzaName)
    if(orderrdPizza){
        cashInRegister+= orderrdPizza.price;
        OrderId+=1;
        const order = {status:"Ordered",pizza:PizzaName,id:OrderId}
        orderQueue.push(order);
        return  order;
    }
    return null
}

const completeOrder = (id)=>{
    const newOrderQueue = orderQueue.map((order)=>{
        if(order.id === id){
            return {
                ...order,
                status:"Completed"
            }
        }else{
            return order
        }
    })
    orderQueue.length = 0
    orderQueue.push(...newOrderQueue)
    return orderQueue.find(order=>order.id === id)
}

addNewPizza({name:"Mango Pineapple",price:15});
addNewPizza({name:"Spinach healthy",price:12});

placeOrder("Mango Pineapple")

completeOrder(1)

console.log("Menu:",menu)
console.log("register:",cashInRegister)
console.log("Order queue:",orderQueue)


}