import {createApolloFetch} from 'apollo-fetch';


const uri="https://server-event-79524.herokuapp.com/graphql";
export const apolloFetch=createApolloFetch({uri});

export const createEvent=(title,description,date,price,arr)=>{
    return `mutation{createEvent(inputEvent:{
        title:"${title}"
        description:"${description}"
        date: "${date}"
        price:${price}
    }){
        ${arr}
    }
}`
};

apolloFetch.use(({ request , options }, next) => {
    if (!options.headers) {
      options.headers = {};  // Create the headers object if needed.
    }
    if(request.auth){
        console.dir(request);
        options.headers['auth'] = request.auth;
        delete request.auth;
        console.log(request);
    }
    next();
  })

export const allEvent=(number,arr)=>{
    return `query{event(first:${number}){${arr}}}`
};

export const signup=(email,password,arr)=>{
    return `mutation{createUser(email:"${email}",password:"${password}"){
        ${arr}}
    }`
};

export const login=(email,password,arr)=>{
    return `mutation{login(email:"${email}",password:"${password}"){
        ${arr}}
    }`
};

export const bookEvent=(eventId,arr)=>{
    return `mutation{bookEvent(eventId:"${eventId}"){
        ${arr}}
    }`
};

export const deleteEvent=(eventId,arr)=>{
    return `mutation{deleteEvent(eventId:"${eventId}"){
        ${arr}}
    }`
};

export const cancelBook=(eventId,arr)=>{
    return `mutation{cancelBook(eventId:"${eventId}"){
        ${arr}}
    }`
};
