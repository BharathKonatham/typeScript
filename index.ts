const menu = [
    {   
        id:1,
        name:"Margherita",
        price:8 ,  
    },
    {   id:2,
        name:"Pepperoni",
        price:8 ,  
    },
    {   id:3,
        name:"Hawaina",
        price:8 ,  
    },
    {   id:4,
        name:"Veggie",
        price:8 ,  
    }  
]

type pizza = {
    id:number
    name: string,
    price:number,
}


type orderStatus = "Completed" | "Ordered"
type orderItem = {
    pizza?:pizza
    status: orderStatus
    id:number
}


const orderQueue:orderItem[] = []

const addNewPizza = (newPizza:pizza)=>{
    menu.push(newPizza);
}
let  OrderId:number = 0;
let cashInRegister:number = 100
// addNewPizza({name:"Chicken",
//         price:8 ,  }
//     )

const placeOrder= (PizzaName:string): orderItem | undefined =>{
    const orderedPizza = menu.find(pizza=>pizza.name === PizzaName)
    if(orderedPizza){
        cashInRegister+= orderedPizza.price;
        OrderId+=1;
        const order:orderItem = {status:"Ordered",pizza:orderedPizza,id:OrderId}
        orderQueue.push(order);
        return  order;
    }
    return undefined
}

const completeOrder = (id:number): orderItem=>{
    const newOrderQueue = orderQueue.map((order:orderItem)=>{
        if(order.id === id){
            return {
                ...order,
                status:"Completed" as const
            }
        }else{
            return order
        }
    })
    orderQueue.length = 0
    orderQueue.push(...newOrderQueue)
    return orderQueue.find((order:orderItem)=>order.id === id)! //non-null assertion 
            // (!) to tell TypeScript that the result of find will not be undefined
}

const getPizzaDetail = (identifier:string|number): pizza | undefined =>{
    if(typeof(identifier)=== "string"){
        return menu.find((item:pizza)=> item.name.toLowerCase() === identifier.toLowerCase() )
    }
    else if(typeof(identifier) === "number"){
        return menu.find((item:pizza) => item.id === identifier)
    }
    else{
        throw new TypeError("identifier must be string on number")
    }
}

addNewPizza({id:5,name:"Mango Pineapple",price:15});
addNewPizza({id:6,name:"Spinach healthy",price:12});

placeOrder("Mango Pineapple")

completeOrder(1)

console.log("Menu:",menu)
console.log("register:",cashInRegister)
console.log("Order queue:",orderQueue)


