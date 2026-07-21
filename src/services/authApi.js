import { apikey } from "../config/config";


export const signupAPI=async(email,password)=>{
    try {
        const response=await fetch (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apikey}`,{
            headers:{
                
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })      
        })

        const data=await response.json();
        if (!response.ok) {
            throw new Error(data.error.message);
        }
        return data;
    } catch (error) {
        return {error:error.message}
    }
}

export const signinAPI=async(email,password)=>{
    try {
        const response=await fetch (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`,{
            headers:{
                
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })      
        })

        const data=await response.json();
        if (!response.ok) {
            throw new Error(data.error.message);
        }
        return data;
    } catch (error) {
        return {error:error.message}
    }
}