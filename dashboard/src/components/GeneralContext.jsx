import React, { useState }  from 'react'
import BuyActionWindow from './BuyActionWindow'


const GeneralContext = React.createContext({
  openBuyWindow :(uid) => {},
  closeBuyWindow:()=>{}
})

export const GeneralContextProvider = (props)=> {

  const [isBuyWindowOpen,setIsBuyWindowOpen] = useState(false)
  const [selectedStockUid,setSelectedStockUid] = useState("")
  
  const handelOpen =(uid)=>{
    setIsBuyWindowOpen(true)
    setSelectedStockUid(uid)
  }

  const handelClose = ()=>{
    setSelectedStockUid("")
    setIsBuyWindowOpen(true)
  }

  return (
    <GeneralContext.Provider
    value={{
      openBuyWindow:handelOpen,
      closeBuyWindow:handelClose,
    }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUid} />}
    </GeneralContext.Provider>
  )
}

export default GeneralContext
