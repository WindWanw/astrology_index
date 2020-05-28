/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-11 17:04:58
 */
//获取性别
const getSexStatus = (status) => status == '0' ? '女' : '男';

//状态
const getStatus = (status) => status == 0 ? '禁用' : '启用';

//标签、按钮颜色
const getColor = color => {
    switch (String(color)) {
        case '1':
            return 'primary';
            break;
        case '2':
            return 'success';
            break;
        case '3':
            return 'warning';
            break;
        case '4':
            return 'info';
            break;
        case '5':
            return 'danger';
            break;
        default:
            return 'warning';
    }
}

const getTagColor = t => {
    if (typeof (t) == 'number') {

        let i = t % 5;

        switch (i) {
            case 0:
                return 'primary';
                break;
            case 1:
                return 'success';
                break;
            case 2:
                return 'warning';
                break;
            case 3:
                return 'info';
                break;
            case 4:
                return 'danger';
                break;
            default:
                return 'warning';
        }
    }
}



export default {
    getSexStatus,
    getStatus,
    getColor,
    getTagColor
}