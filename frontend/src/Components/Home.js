import React ,{useEffect,useState} from 'react';
import '../styles/style.css';
import axios from "axios";
import Modal from 'react-modal';
import {useNavigate,useParams } from 'react-router-dom';
import Cart from './cart';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.75)',
        textAlign: 'center',
        lineHeight:'3px'
    }
};

const customStylesC = {
    content: {
        width:'50%',
        height:'80%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.75)',
        // textAlign: 'center',
        lineHeight:'3px',
        color:'white'
    }
};
const Home = () =>{
    const navigate = useNavigate();
    const params = useParams();
    const [productData, setProductData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalAnOpen, setModalAnOpen] = useState(false);
    const [modalCopen, setModalCOpen] = useState(false);
    const [signUser, setSignUser] = useState([]);
    const [logUser, setLogUser] = useState([]);
    const [username, setUsername] = useState("")
    const [login, setLogin] = useState(false)
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [cartItems, setCartItems] = useState(localStorage.getItem("cartItems"))

    const fetchProducts = () => {
        axios.get('http://localhost:8500/getAllProducts')
            .then((res) => setProductData(res.data.products))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchProducts();
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token',token);
          } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
          }
          if(cartItems){
            var cartPrd = localStorage.getItem('cartItems');
          }
    },[token,cartItems])

    const ModalAnopen = () => {
        setModalAnOpen(true)
    }
    const ModalAnClose = () => {
        setModalAnOpen(false)
    }


    const signinApi = () => {
        const data = {
            username: name,
            email: mail,
            password: pass
        }
        axios.post(`http://localhost:8500/register/`, data)
            .then((res) => {
                setSignUser(res.data.user)
                setLogin(true)
                setToken_(res.data.token)
                // localStorage.setItem(token,res.token)
                // console.log(res.data.token)
                window.location.reload()
            })
            .catch(err => err, 'signinfailed')
        ModalAnClose();
    }

    const targetName = (e) => {
        setName(e.target.value)
    }
    const targetMail = (e) => {
        setMail(e.target.value)
    }
    const targetPass = (e) => {
        setPass(e.target.value)
    }

    const Modalopen = () => {
        setModalIsOpen(true)
    }
    const ModalClose = () => {
        setModalIsOpen(false)
    }

    const Modalcart = () =>{
        setModalCOpen(true)
    }

    const ModalcartClose = () =>{
        setModalCOpen(false)
    }

    const logout = (e) =>{
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem('token')
        setLogin(false)
        window.location.reload()

    }

    const loggedInApi = (e) => {
        e.preventDefault();
        const data = {
            username: name,
            password: pass
        }
        axios.post(`http://localhost:8500/login/`, data)
            .then((res) => {
                setLogin(true)
                setLogUser(res.data.user);
                setToken_(res.data.token)
                console.log(logUser, 'login success');
            })
            .catch(err => err, 'loginfailed')

        ModalClose()
    }
   
    const  handleClick =(product) =>{
        setCartItems(prev =>[...prev, product]);
        // localStorage.setItem('cartItems', JSON.stringify(prev =>[...prev, product]));

    }
    

    return(
        <div>
            {!token? (
                <div className='header'>
                <button className="loginbutt" onClick={Modalopen} > Login</button>
                <button className="createbutt" onClick={ModalAnopen}> SignUp</button>
                </div>
            ):(
                <div className='header'>
                <button className="loginbutt" > Welcome</button>
                <button className="cartbutt" onClick={Modalcart}>Cart</button> 
                <button className="createbutt" onClick={logout}> logout</button>  
                </div>
            )
          }
            <div className='productList'>
            {productData.map((product)=>{
                return(
            <div>
                <div className='imgstyl'>
                <img src="../assets/elegant-smartphone-composition.jpg" style={{ height: "250px", width: "200px",marginLeft: "110px"}}/>
                </div>
                <div className='detsilsTab' key={product.id}>
                    <h3>{product.title}</h3>
                    <h4>{product.description}</h4>
                    <h5>Original price : &#8377;{product.originalprice}</h5>
                    <h5>Discounted price : &#8377;{product.discountedprice}</h5>
                    <h5>Selling price : &#8377;{product.sellingPrice}</h5>
                    <h6>Quantity:{product.quantity} {product.uom}</h6>
                    <button onClick={() => handleClick(product)} >Add to cart</button>
                </div> 
                  
                    
                </div>
                 ) 
                })} 
            </div>

            <Modal isOpen={modalAnOpen} style={customStyles}>
                <form onSubmit={signinApi}>
                    <h1 style={{ color: 'orange' }}>Registeration Form</h1>
                    <br />
                    <label><h3 style={{ color: 'orange' }}>Username :</h3></label>
                    <br />
                    <input type="text" onChange={targetName} value={name} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter a name' />
                    <br />
                    <label><h3 style={{ color: 'orange' }}>Email:</h3></label>
                    <br />
                    <input type="email" onChange={targetMail} value={mail} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter a valid Email' />
                    <br />
                    <label><h3 style={{ color: 'orange' }}>Password:</h3></label>
                    <br />
                    <input type="password" onChange={targetPass} value={pass} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter Password' />
                    <br />
                    <br /><br />
                    <input type="button" className='border border-3 rounded-3' onClick={signinApi} value="submit" />
                    <div className='btn' style={{ backgroundColor: 'gray', color: 'white' }} onClick={ModalAnClose}>close</div>

                </form>
            </Modal>

            <Modal id='login' isOpen={modalIsOpen} style={customStyles}>
                <h1 style={{ margin: 'auto', textAlign: 'center', color: 'orange' }}>Login</h1>

                <label><h3 style={{ color: 'orange' }}>Email:</h3></label>
                <br />
                <input type="text" value={name} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' onChange={targetName} placeholder='Enter a valid username' />
                <br />
                <label><h3 style={{ color: 'orange' }}>Password:</h3></label>
                <br />
                <input type="password" value={pass} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' onChange={targetPass} placeholder='Enter Password' />
                <br /><br /><br /><br />
                <button className='btn' style={{ backgroundColor: 'gray', color: 'white' }} value={username} onClick={loggedInApi} >login</button>
                <br /><br /><br /><br />
                
                <div className='btn' style={{ backgroundColor: 'gray', color: 'white' }} onClick={ModalClose}>close</div>
            </Modal>

            <Modal id='cart' isOpen={modalCopen} style={customStylesC}>
                <h1 style={{ margin: 'auto',color: 'orange' }}>Cart</h1><br/><br/><br/>
                <span onClick={ModalcartClose} style={{marginLeft:"90%"}}>X</span>
                <br/><br/><br/>
                <div>
                    <div className='imgstyl'>
                        <img src="../assets/elegant-smartphone-composition.jpg" style={{ height: "80px", width: "80px",marginLeft: "10px"}}/>
                    </div>
                            <div className='detsilsTab'>
                            <h6>iPhone 9</h6>
                            <p>130000</p>
                            <p>1 No</p>
                        </div>           
                </div>
                <br />
            </Modal>
        </div>
    )
}

export default Home;