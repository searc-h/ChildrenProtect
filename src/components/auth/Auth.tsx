import React from 'react'
import {ReactNode} from "react";
import {Navigate}  from 'react-router-dom'

import getToken from '../../utils/getToken'
interface Props {
  children: ReactNode,
}

export default function Auth(props:Props) {

  const token:string = getToken()
  
  if(token){
    return <>{props.children}</>
  }else{
    return <Navigate to={'/login'} replace/>
  }
  
}
