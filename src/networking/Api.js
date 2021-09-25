import { useState, useEffect }  from "react";
import getDates from "../utilities/getDates";

export async function fetchUser(){    
  try {
    const fetchResult = await fetch(`https://my.tanda.co/api/v2/users/me`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')}})    
   // console.log(fetchResult)
    if (!fetchResult.ok) {
      const errorMessage = `An error has occured: ${fetchResult.status}`;   
      throw Error(errorMessage)  
    }
    else {
      const user = await fetchResult.json()  
      return user 
      //localStorage.setItem('user', JSON.stringify(user))  
    }
  } catch(err) {   
    
    //setError(err.message)
    return err.message
  }
}

export async function fetchClock(userID){
  try {
    //const user = JSON.parse(localStorage.getItem('user'))   
    const past = getDates()[0]
    const today = getDates()[1]
    const fetchResult = await fetch(`https://my.tanda.co/api/v2/clockins` + 
    `?user_id=${userID}&from=${past}&to=${today}` ,{
      method: "GET",
      headers: {Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')}});
     // console.log(fetchResult)
    if (!fetchResult.ok) {
      const errorMessage = `An error has occured: ${fetchResult.status}`;   
      throw Error(errorMessage)  
    }
    else {
      const clock = await fetchResult.json()
        
      if (clock.length > 0) {
        const t = clock[clock.length - 1].type
        if (t !== 'finish') {
          return true       
        } else {
          return false    
        }
      } else {
        return false     
      }
    }
  }
  catch(err) {    
    
    //setError(err.message)
    return err.message
  }
}

export async function fecthDiscount(){
  try {
    const fetchResult = await fetch(`https://my.tanda.co/api/v2/platform/discounts`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')
      },
    })
    //console.log(fetchResult)
    if (!fetchResult.ok) {
      const errorMessage = `An error has occured: ${fetchResult.status}`;   
      throw Error(errorMessage)  
    }
    else {
      const discount = await fetchResult.json()
      return discount
    }           
  }
  catch(err) { 
    //setError(err.message)
    return err.message
  }
   
}