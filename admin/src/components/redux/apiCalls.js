import localStorage from "redux-persist/es/storage";
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { getProductFailure, 
  getProductStart, 
  getProductSuccess,
deleteProductFailure,
deleteProductStart,
deleteProductSuccess } from "./productSlice";


export const login = async(dispatch, user) => { 
  dispatch(LOGIN_START());

  try {

    const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      });
      const parseRes = await response.json()
      if (parseRes.token) {
          console.log(parseRes.token)
          const user = localStorage.setItem('token', parseRes.token)
                     
           
      }

      
      else {
        console.log("Wrong username/password")

       
      }

      
    } catch (err) {
      console.error(err.message);

      
    }
  }
export const logout = (dispatch) => {
    localStorage.removeItem("token")
    dispatch(REMOVE_ACTIVE_USER());
  };


  export const getProducts = async(dispatch) => { 
    dispatch(LOGIN_START());
  
    try {
      dispatch(getProductStart());
      const response = await fetch("http://localhost:5000/products", {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });
        const allProducts = await response.json()
       dispatch(getProductSuccess(allProducts));
             
        
      } catch (err) {
        dispatch(getProductFailure());
        
      }
    }

    export const deleteProducts = async(dispatch, id) => { 
      dispatch(deleteProductStart());
    
      try {
        const response = await fetch(`http://localhost:5000/products/delete/${id}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
          });
         dispatch(getProductSuccess(response.json(id)));
               
          
        } catch (err) {
          dispatch(getProductFailure());
          
        }
      }


   export const getCart = async (dispatch, user) => {
    
    try {

      const cart = await fetch(`http://localhost:5000/cart/${user.id}`, {
        method:"GET"
      });
      cart.json()
    } catch (error) {
      if (error.response.status === 401) {
          console.log(error)
      } else {
        console.log(error);
      }
    }
  };