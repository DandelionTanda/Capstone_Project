import { useState, useEffect }  from "react";
import getDates from "../utilities/getDates";

export const url = "https://internal-allow-partner-organisation-to-be-switched-to.ms.tanda.co";

export async function fetchUser(){    
  try {
    const fetchResult = await fetch(`${url}/api/v2/users/me`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('org_tokenType')+ ' ' +localStorage.getItem('org_token')}})    
   // console.log(fetchResult)
    if (!fetchResult.ok) {
      const errorMessage = `An error has occured: ${fetchResult.status}`;  
      throw Error(errorMessage)  
    }
    else {
      const user = await fetchResult.json()  
      return user    
    }
  } catch(err) {   
    return err
  }
}

export async function fetchClock(userID){
  try {    
    const past = getDates()[0]
    const today = getDates()[1]
    const fetchResult = await fetch(`${url}/api/v2/clockins` + 
    `?user_id=${userID}&from=${past}&to=${today}` ,{
      method: "GET",
      headers: {Authorization: localStorage.getItem('org_tokenType')+ ' ' +localStorage.getItem('org_token')}});    
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
    return err
  }
}

export async function fetchDiscount(){
  try {
    const fetchResult = await fetch(`${url}/api/v2/platform/discounts`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('org_tokenType')+ ' ' +localStorage.getItem('org_token')
      },
    })
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
    return err
  }
   
}

export async function getOrgToken(org_id){
  
  try {
    const fetchResult = await fetch(`${url}/api/oauth/token`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token:localStorage.getItem("partner_token"),
        organisation_id:org_id,
        scope:"me user device platform organisation",
        grant_type:"partner_token"
      })
    })
    if (!fetchResult.ok) {
      const errorMessage = `An error has occured: ${fetchResult.status}`;   
      throw Error(errorMessage)  
    }
    else {
      const org_token = await fetchResult.json()   
      localStorage.setItem('org_token', org_token.access_token)
      localStorage.setItem('org_tokenType', org_token.token_type)  
    }    
  }
  catch(err) {  
    console.log(err)  
    return err
  }
}