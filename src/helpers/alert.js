// this func is checking if the response of our query has an error and alert it 
export const AlertHandler=(res)=>{
    return res.errors?res.errors.map(er=>alert(er.message)):null;
}