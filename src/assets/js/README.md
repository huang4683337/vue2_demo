公共js，添加存储模块store
https://github.com/marcuswestin/store.js
API
// Store current user
store.set('user', { name:'Marcus' })

// Get current user
store.get('user')

// Remove current user
store.remove('user')

// Clear all keys
store.clearAll()

// Loop over all stored values
store.each(function(value, key) {
	//console.log(key, '==', value)
})
使用
import store from 'store';
store.set('user', { name:'Marcus' })
store.get('user').name == 'Marcus'
