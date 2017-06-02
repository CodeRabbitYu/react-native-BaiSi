/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'


const Request = {
    get:(url, successCallBack , failCallBack) =>{
        console.log(url);
        return fetch(url)
            .then((response) => response.json())
            .then((response) => {
                successCallBack(response);
            })
            .catch ((error) => {
                failCallBack(error);
            });
    }
};

module.exports = Request;