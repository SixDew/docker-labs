import { Fragment, useEffect, useRef } from "react";
import { LoginById, CreateUser } from "./api";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const idInput = useRef(null)
    const nav = useNavigate()

    async function login(){
        const response = await LoginById(idInput.current.value)
        if(response.ok){
            const userData = await response.json()
            localStorage.setItem("count", userData.count)
            localStorage.setItem("id", userData.id)
            nav(`/counter`)
        }
        else{
            const createResponse = await CreateUser(idInput.current.value)
            if(createResponse.status === 201){
                LoginById(idInput.current.value)
                .then(response=>response.json())
                .then(data=>{
                    localStorage.setItem("count", data.count)
                    localStorage.setItem("id", data.id)
                    nav(`/counter`) 
                })
            }
        } 
       }

    return (
        <Fragment>
            <h1>Введите id пользователя</h1>
            <input type="text" ref={idInput}/>
            <button onClick={login}>Отправить</button>
        </Fragment>
    )
}