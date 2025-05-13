const { useEffect, useState } = require("react")

export const GetUser = ()=>{
      const [user , setUser] = useState()
      useEffect(_=> {
            setUser(JSON.parse(localStorage.getItem("soomha-user")))
      } ,[])

      return user
}