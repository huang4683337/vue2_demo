import common from './../assets/js/common'

// console.log(process.env.NODE_API);
// console.log(process.env);

export default {

    data: function (callback) {
        setTimeout(() => {
            callback(10)
        }, 2000)
    }
}
