import configs from '@/configs'
import FastClick from 'fastclick'

// 开发环境中不载入次模块
if (!configs.debug) FastClick.attach(document.body)
