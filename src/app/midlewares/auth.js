const express = require('express');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');


module.exports = (request, response, next) => {
    const authHeaders = request.headers.authorization;

    if(!authHeaders){
        return response.status(401).send({error: 'O token nao foi informado'});
    }
   
    //Todo Token de autenticacao inicia por BEAR e um hesh long vamos verificar isso no prossimo passo

    const partesToken = authHeaders.split(' ')//Separando em duas partes 

    if(!partesToken.length ===2)
        return response.status(401).send({error: 'Token nao reconhecido'});
    
    const [scheme, token] = partesToken;

        //verificando  se a primeira palavra inicia por BEARER
        //[i] - o I fala que e case sensive

        if(!/^Bearer$/i.test(scheme))
            return response.status(401).send({error: 'Token mal formado'});
      

        jwt.verify(token, authConfig.secret, (erro, decoded) =>{
            if (erro) return response.status(401).send({error: 'Token Invalido'});
            
            request.userId = decoded.id;
            return next();
            });
    
};