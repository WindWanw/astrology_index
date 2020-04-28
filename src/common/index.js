/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-28 17:30:48
 */
const add = function (...addend) {
    let val = 0;
    addend.forEach(item => {
        val += item;
    })

    return val;
}

/**
 * 将数据重置为空
 * @param {*} data 
 */
const setDefaultData = function (data) {
    for (let i in data) {
        let type = typeof (data[i]);
        switch (type) {
            case 'string':
                data[i] = "";
                break;
            case 'number':
                data[i] = "";
                break;
            case 'array':
                data[i] = [];
                break;
            case 'object':
                data[i] = [];
                break;
            default:
                data[i] = "";
        }

        if (i == "page") {
            data[i] = 1;
        }

        if (i == "limit") {
            data[i] = 10;
        }
    }

    return data;
}

/**
 * 将data中的数据copy到form中
 * @param {被赋值} form 
 * @param {赋值} data 
 */
const setAssignData = (form, data) => {

    for (let i in form) {

        let t = typeof (data[i]);

        if (t == "number") { //如果data中类型为数字的，则转换成字符串
            form[i] = String(data[i]);
        } else {
            form[i] = data[i];
        }
    }

    return form;
}

/**
 * 转换数据
 * @param {被转换} data 
 * @param {转换的类型} type 
 */
const setDataChange = (data, type = 'array') => {

    let t = typeof (data);
    let list = [];

    if (t == 'object') {
        switch (type) {
            case 'array':
                for (let i in data) {
                    list.push(data[i]);
                }
                return list;
                break;

            default:
                return data;
                break;
        }
    } else if (t == 'array') {
        return data;
    }
}

export default {
    add,
    setDefaultData,
    setAssignData,
    setDataChange
}