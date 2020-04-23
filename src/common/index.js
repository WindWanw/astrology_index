const add = function(...addend) {
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
const setDefaultData = function(data) {
    for (let i in data) {
        let type = typeof(data[i]);
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

        if (typeof(data[i]) == "number") { //如果data中类型为数字的，则转换成字符串
            form[i] = String(data[i]);
        } else {
            form[i] = data[i];
        }
    }

    return form;
}

export default {
    add,
    setDefaultData,
    setAssignData
}