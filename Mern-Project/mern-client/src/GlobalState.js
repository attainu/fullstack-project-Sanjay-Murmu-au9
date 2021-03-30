
import React,{createContext,useEffect,useState} from 'react'
import ProductAPI from './api/ProductAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'
import axios from 'axios';

export const GlobalState = createContext();

export const DetaProvider =({children})=>{
    const [token,setToken]=useState(false)

    
    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async ()=>{
                const res = await axios.get('/user/refresh_token')//coming from useCrtl model
                // console.log(token);//iske threw jo ref_token ki api genrate ki usse acesstoken mila
                setToken(res.data.accesstoken)
                //jo login hoga user uska accesstoken set ho jayega
                setTimeout(()=>{
                    refreshToken()
                },10 * 60 * 1000)
            }
            refreshToken()

        }
        
    },[])



    const state ={
        token : [token,setToken],
        productAPI: ProductAPI(),
        //state mai add krenge userAPI se user info check krne k liye
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()


    }
    return(
       
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}