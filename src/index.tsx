import Swiper from './components/plugin-native-web-swiper';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	components:{
		Swiper: Swiper
	},
	description: 'swiper with native and web support',
	key: '@bluebase/plugin-native-web-swiper',
	name: 'plugin-native-web-swiper',
	version: '1.0.0',
});
