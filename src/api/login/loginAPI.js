/**
 * Created by zhaojianfeng on 2017/8/25.
 */
import axios from '../axiosConfig';
import common from './../../assets/js/common'

export default {
    login: function (params) {//登录
        var url = `${common.SIPOPAPI_Base.admin}/login`;
        return axios.post(url, {}, params);
    },
    loginout: function (params) {//退出登陆
        var url = `${common.SIPOPAPI_Base.admin}/logout`;
        return axios.get(url, params);
    },
    me: function (params) {//验证是否登陆
        var url = `${common.SIPOPAPI_Base.admin}/me`;
        return axios.get(url, params);
    },
    updateMeInfo: function (params) {//验证是否登陆
        var url = `${common.SIPOPAPI_Base.admin}/updateMeInfo`;
        return axios.put(url, params);
    },

    //教师列表
    geTeachterList: function (params) {
        var url = `${common.SIPOPAPI_Base.admin}/Lecturer/getLecturer/{pageNum}/{pageSize}`;
        return axios.get(url, params);
    },
    //获取讲师详情
    geTeachterDetail: function (params) {
        var url = `${common.SIPOPAPI_Base.admin}/Lecturer/getLecturerById`;
        return axios.get(url, params);
    },

    //添加教师
    addTeacher: function (params) {
        var url = `${common.SIPOPAPI_Base.admin}/Lecturer/addLecturer`;
        return axios.post(url, params);
    },

    //编辑教师
    changeTeacher: function (params) {
        var url = `${common.SIPOPAPI_Base.admin}/Lecturer/updateLecturer`;
        return axios.post(url, params);
    },

    //删除讲师
    deleteTeacher: function (params) {
        var url = `${common.SIPOPAPI_Base.admin}/Lecturer/deleteLecturer`;
        return axios.get(url, params);
    },

    //发布讲师
    isRelease: function (params) {
        var url = `${common.SIPOPAPI_Base.admin}/Lecturer/isRelease`;
        return axios.get(url, params);
    },
};
