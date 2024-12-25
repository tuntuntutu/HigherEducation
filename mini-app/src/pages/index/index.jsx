import React, {useEffect, useState} from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import { Button, Radio } from '@nutui/nutui-react-taro'
import '@nutui/nutui-react-taro/dist/style.css';

import './index.less'


function Index() {

    return (
        <View style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                justifyContent: 'center'
            }}>
            <Radio>111</Radio>
            <Button onClick={() => {
                Taro.navigateTo({
                    url: '/sessionA/pages/index/index',
                })
            }}>大学心理学
            </Button>
            <Button onClick={() => {
                Taro.navigateTo({
                    url: '/sessionB/pages/index/index',
                })
            }}>教师伦理学
            </Button>
            <Button onClick={() => {
                Taro.navigateTo({
                    url: '/sessionC/pages/index/index',
                })
            }}>高等教育学
            </Button>
            <Button onClick={() => {
                Taro.navigateTo({
                    url: '/sessionD/pages/index/index',
                })
            }}>高等教育法规
            </Button>
        </View>
    )
}

export default Index
