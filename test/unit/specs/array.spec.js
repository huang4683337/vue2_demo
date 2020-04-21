import Vue from 'vue'
import Hello from '@/components/Hello'

describe('Array', () => {
  it('测试数组长度', () => {
    var arr=[];
    expect(arr).to.be.lengthOf(0)
  })
})
