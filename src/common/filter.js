//获取性别
const getSexStatus = (status) => status = '0' ? '女' : '男';

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
            return '';
    }
}

//获取文章类型
const getArticleType = (type) => {
    switch (String(type)) {
        case '1':
            return '原创';
            break;
        case '2':
            return '转载';
            break;
        case '3':
            return '翻译';
            break;
        default:
            return '未定义';
    }
}

//文章发布形式
const getArticleModality = modal => {
    switch (String(modal)) {
        case '1':
            return '公开';
            break;
        case '2':
            return '私密';
            break;
        case '3':
            return '粉丝可见';
            break;
        case '4':
            return 'VIP可见';
            break;
        default:
            return '未定义';
    }
}



export default {
    getSexStatus,
    getColor,
    getArticleType,
    getArticleModality
}