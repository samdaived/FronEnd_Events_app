export const storeAuth=(data,action)=>{

    localStorage.setItem("token",data.data[action].token)
    localStorage.setItem("userId",data.data[action].userId)
    localStorage.setItem("expiredIn",data.data[action].expiredIn+new Date().getTime())
};

export const restorAuth=()=>{

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