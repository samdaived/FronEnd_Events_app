
export const storeAuth=(data,action)=>{
  // Storing the Auth Data in the local storage
    localStorage.setItem("token",data.data[action].token)
    localStorage.setItem("userId",data.data[action].userId)
    localStorage.setItem("expiredIn",data.data[action].expiredIn+new Date().getTime())
};

export const restorAuth=()=>{
  // try to fetch the Auth from the local storage and validate them
    let expiredIn=localStorage.getItem("expiredIn");
    let token="";
    let userId="";
    
    if(expiredIn&&expiredIn>new Date().getTime()){
        token= localStorage.getItem("token");
        userId=localStorage.getItem("userId");
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiredIn");
        expiredIn="";
      }
    return {token,userId,expiredIn}
}