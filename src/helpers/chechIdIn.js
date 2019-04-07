//Checking if the array has the User Id
export const CheckIfItHas=(arr)=>{
    const ID=localStorage.getItem("userId");
        const isIn=arr.filter(el=>el._id===ID);
        return isIn.length>0?true:false
}