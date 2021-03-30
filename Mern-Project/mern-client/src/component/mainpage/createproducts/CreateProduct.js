import React, { useContext, useState,useEffect } from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utilits/loading/Loading'
import {useHistory,useParams} from 'react-router-dom'


const initialState = {
    product_id:'',
    title :'',
    price:0,
    description:'Why pay premium for premium eyewear?We bring innovation in eyewear for you to get the best pairs that complement your identity, at affordable prices.',
    content:'UV Protected',
    category:'',
    _id:''
    
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product,setProduct] = useState(initialState)
    const [categories]=state.categoriesAPI.categories
    const [images,setImage]=useState(false)
    const [loading,setLoading]=useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token]= state.token

    const history= useHistory()
    const param = useParams()

    const [products]= state.productAPI.products
    const [onEdit,setOnEdit]=useState(false)
    const [callback,setCallback]= state.productAPI.callback

    useEffect(()=>{
        if(param.id){
            setOnEdit(true)
            products.forEach(product=>{
                if(product._id === param.id){
                    setProduct(product)
                    setImage(product.images)
                } 
            })
           
        }else{
            setProduct(initialState)
            setImage(false)
            setOnEdit(false)
        }
    },[param.id])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert('You are not a admin')
            const file = e.target.files[0]
            // console.log('molu',file);
            if(!file) return alert('File not exist')

            if(file.size >1024 * 1024)//1 mb
                return alert('size is to large')

            if(file.type !== 'image/jpeg' && file.type !=='image/png')
                return alert('file format is incorrect')

            let formData = new FormData()
            formData.append('file',file)

            setLoading(true)
            const res = await axios.post('/api/upload',formData,{
                headers:{'content-type': 'multipart/form-data', Authorization : token}
            })
            setLoading(false)
            // console.log("molu",res);
            setImage(res.data)
            
        } catch (err) {
            alert(err.response.data.msg)
            
        }
    }
    const handleDestroy = async ()=>{
        try {
            if(!isAdmin) return alert('You are not Admin')
            setLoading(true)
            await axios.post('/api/destroy',{public_id : images.public_id},{
                headers: {Authorization :token}
            })
            setLoading(false)
            setImage(false)
            
        } catch (err) {
            alert(err.response.data.msg)
            
        }
    }
    const handleChangeInput =  e =>{
        const{name,value} = e.target
        setProduct({...product,[name]:value})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert('You are not a admin')
            if(!images) return alert('No image Upload')

            if(onEdit){
              await axios.put(`/api/products/${product._id}`,{
                headers: {Authorization: token}
              })  
            }else{
            await axios.post('/api/products',{...product,images},{
                headers: {Authorization: token}
            })
        }
            setCallback(!callback)
            history.push('/')

        } catch (err) {
            alert(err.response.data.msg)
            
        }
    }

    const styleUpload ={
        display: images ? 'block':'none'
    }

    return (
        <div className='create_product'>
            <div className='upload'>
                <input type ='file' name ='file' id ='file_up' onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor ='product_id'>Product ID</label>
                    <input type = 'text' name ='product_id' id='product_id' required
                    value={product.product_id} onChange={handleChangeInput} disabled= {onEdit}/>
                </div>
                <div className='row'>
                    <label htmlFor ='title'>Title</label>
                    <input type = 'text' name ='title' id='title' required
                    value={product.title} onChange={handleChangeInput} />
                </div>
                <div className='row'>
                    <label htmlFor ='price'>Price</label>
                    <input type = 'number' name ='price' id='price' required
                    value={product.price} onChange={handleChangeInput}/>
                </div>
                <div className='row'>
                    <label htmlFor ='description'>Description</label>
                    <textarea type = 'text' name ='description' id='description' required
                    value={product.description} rows='5' onChange={handleChangeInput}/>
                </div>
                <div className='row'>
                    <label htmlFor ='content'>Content</label>
                    <textarea type = 'text' name ='content' id='content' required
                    value={product.content} rows='7' onChange={handleChangeInput}/>
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type='submit'>{onEdit ? "update" :"Create"}</button>
            </form>
            
        </div>
    )
}

export default CreateProduct
