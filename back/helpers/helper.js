'use strict'

const helper = {};

/**
 * 
 * @param {Number[]} values 
 */
helper.__array_string = (values) => {
    console.log(values);
    if (!values || (values && values.length == 0)) return null;

    let array_string = '{';

    array_string += values.join();

    array_string += '}';
    
    return array_string;
}

module.exports = helper;