/**
 * Created by Administrator on 2018/6/5.
 */
var qiniu = require('qiniu-js')
window.upLoda = {
    'uploadType': function (n) {
        var data = null;  //回调
        var file = n.data.file;
        var upType = n.data.upType;
        var size = n.data.upSize;
        var key = file.name;        //文件总名
        var name = key.split('.');  // 截取
        var ext = name[name.length - 1].toLowerCase();
        //判断类型
        if(upType != 'all'){
            if (upType.indexOf(ext) == -1) {
                data = {
                    code: 1,
                    msg: '文件格式错误,上传格式为' + upType
                };
                n.success && n.success(data);
                return false;
            }
        }
        //判断文件上传大小
        var Company = size.substr(size.length - 2).toLowerCase(),
            sizeName = size.substr(0,size.length - 2).toLowerCase(),
            fileSize = '';
        if (Company == 'mb') {
            fileSize = file.size / 1024 / 1024;
        } else {
            fileSize = file.size / 1024 / 1024 / 1024;
        }
        if (fileSize > sizeName) {
            data = {
                code: 2,
                msg: '文件最大为' + size
            };
            n.success && n.success(data);
            return false;
        }
        data = {
            code: 0,
            msg: '格式正确'
        };
        n.success && n.success(data);
    },
    'uploadHandle': function (n) {
        var content = n.data;
        var data = null;
        var key = content.file.name;        //文件总名
        var name = key.split('.');  // 截取
        var ext = name[name.length - 1].toLowerCase();

        var params = key.split('.')[0]; //文件名
        var putExtra = {
            fname: key,
            params: content.Biography,
            mimeType: null
        };
        //文件配置
        var config = {
            useCdnDomain: true,
            disableStatisticsReport: false,
            retryCount: 6,
           /* region: 'as0'  //上传区域*/
        };
        //进度
        var next = function (response) {
            var file = response.total;
            var size = file.size / 1024 / 1024;
            var loaded = file.loaded / 1024 / 1024;
            var res = {
                totalSize: size.toFixed(2),  //总大小
                uploaded: loaded.toFixed(2), //已上传
                uploadProgress: file.percent.toFixed(2) //上传进度
            };
            n.uploadProgress && n.uploadProgress(res);
        };
        //报错
        var error = function (err) {
            n.error && n.error(err);
        };
        //上传成功
        var complete = function (res) {
            n.success && n.success(res);
        };

        if (!content.uuid) {
            data = {
                code: 1,
                msg: '缺少uuid'
            };
            n.error && n.error(data);
            return false;
        } else if (!content.token) {
            data = {
                code: 1,
                msg: '缺少token'
            };
            n.error && n.error(data);
            return false
        } else {
            var observable = qiniu.upload(content.file, content.uuid + '.' + ext, content.token, putExtra, config);
            var subObject = {
                next: next,
                error: error,
                complete: complete
            };

            data = {
                code: 0,
                data: {
                    observable: observable,
                    subObject: subObject
                }
            };
            n.call && n.call(data)
        }

    }
};
