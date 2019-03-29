import {createApolloFetch} from 'apollo-fetch';

const url="http://localhost:4000/graphql";
export const apolloFetch=createApolloFetch({uri:url});

export const createEvent=(title,description,date,price,arr)=>{
    return `mutation{createEvent(inputEvent:{
        title:${title}
        description:${description}
        date: ${date}
        price:${price}
    }){
        ${arr}
    }
}`
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
    return `mutation{bookEvent(eventId:"${eventId}){
        ${arr}}
    }`
};

export const deleteEvent=(eventId,arr)=>{
    return `mutation{deleteEvent(eventId:"${eventId}){
        ${arr}}
    }`
};

export const cancelBook=(eventId,arr)=>{
    return `mutation{cancelBook(eventId:"${eventId}){
        ${arr}}
    }`
};
