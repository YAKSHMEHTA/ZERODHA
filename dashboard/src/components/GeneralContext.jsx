import React, { useState }  from 'react'
import BuyActionWindow from './BuyActionWindow'


const GeneralContext = React.createContext({
  openBuyWindow :({uid,price}) => {},
  closeBuyWindow:()=>{}
})

export const GeneralContextProvider = (props)=> {

  const [isBuyWindowOpen,setIsBuyWindowOpen] = useState(false)
  const[selectedprice,setprice] = useState(1)
  const [selectedStockUid,setSelectedStockUid] = useState("")
  
  const handelOpen =({uid,price})=>{
    setIsBuyWindowOpen(true)
    setprice(price)
    setSelectedStockUid(uid)
  }

  const handelClose = ()=>{
    setSelectedStockUid("")
    setIsBuyWindowOpen(false)  // Changed from true to false
  }

  return (
    <GeneralContext.Provider
    value={{
      openBuyWindow:handelOpen,
      closeBuyWindow:handelClose,
    }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUid} price={selectedprice} />}
    </GeneralContext.Provider>
  )
}

export default GeneralContext