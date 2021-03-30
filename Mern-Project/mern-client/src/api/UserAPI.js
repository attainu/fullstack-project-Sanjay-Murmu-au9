
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserAPI(token) {
    const [isLogged,setIsLogged]=useState(false)
    const [isAdmin,setIsAdmin]= useState(false)
    const [cart,setCart] = useState([])

    useEffect(()=>{
      if(token){
          const getUser = async () =>{
              try {
                  const res = await axios.get('/user/info',{
                      headers: {Authorization: token}
                  })
                  //header mai data aa rha info n product ka so ab admin set karenge login check krne ko kisne kiya
                  setIsLogged(true)
                  res.data.role === "1" ? setIsAdmin(true) : setIsAdmin(false)//condition diya ki 1 hoga role to admin hoga
                //   console.log('===>',res); //info ptachalegi
                   setCart(res.data.cart)
              } catch (err) {
                  alert(err.response.data.msg)
              }
          }
          getUser()
      }

    },[token])

  const addCart = async (product)=>{
      if(!isLogged) return alert('Please login to continue buying')
      const check = cart.every(item=>{
        return item._id !== product._id
    })
    if(check){
        setCart([...cart,{...product,quantity : 1}])

        await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
            headers: {Authorization: token}
            //card mai jo user product select karega to uske DB mai uske cart mai add ho jayega
        })

      
    }else{
        alert('This product has been added to cart.')
    }
  }
    return {
        isLogged : [isLogged,setIsLogged],
        isAdmin : [isAdmin,setIsAdmin],
        //then go to header
        cart : [cart,setCart],
        addCart: addCart
    }
}

export default UserAPI