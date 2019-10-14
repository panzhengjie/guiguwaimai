import Mock from 'mockjs'
import apiData from './data.json'
Mock.mock('/shopinfo', {code:0, data:apiData.info})
Mock.mock('/goods', {code:0, data:apiData.goods})
Mock.mock('/ratings', {code:0, data:apiData.ratings})
