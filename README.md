<div align="center">
	<img width=125 height=125 src="assets/common/logo.png">
  <h1>
		plugin-native-web-swiper
	</h1>
  <p>swiper with native and web support</p>
</div>

<hr />

<!-- ## 🎊 Status

[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@bluebase/plugin-native-web-swiper.svg?style=flat)](https://npmjs.org/package/@bluebase/plugin-native-web-swiper "View this project on npm")
[![Build Status](https://travis-ci.com/BlueBaseJS/plugin-native-web-swiper.svg?branch=master)](https://travis-ci.com/BlueBaseJS/plugin-native-web-swiper)
[![codecov](https://codecov.io/gh/BlueBaseJS/plugin-native-web-swiper/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueBaseJS/plugin-native-web-swiper)
[![Greenkeeper badge](https://badges.greenkeeper.io/BlueBaseJS/plugin-native-web-swiper.svg)](https://greenkeeper.io/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/BlueBaseJS/plugin-native-web-swiper/blob/master/CONTRIBUTING.md)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3c79162871414b6aa7c15d1a423adeca)](https://www.codacy.com/app/BlueBaseJS/plugin-native-web-swiper?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BlueBaseJS/plugin-native-web-swiper&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/github/BlueBaseJS/plugin-native-web-swiper/badge.svg)](https://snyk.io/test/github/BlueBaseJS/plugin-native-web-swiper)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) -->

## API

This plugin is forked from [react-native-web-plugin](https://www.npmjs.com/package/react-native-web-swiper).
You can find the docs for the available props from the link given above. There are three aditional props in this plugin

### __Additional Props__:
__scrollEnabled__(_boolean_): This will block the transition on swipe.

__showDots__(_boolean_): This will control the visibilty of bottom navigation dots View.

__showNextPrev__(_boolean_): There are next and prev buttons pre-rendered on the screen. You can control the visibility of those buttons with this prop.


## Usage
Here is a code snipet using all the above mentioned props:
 ```
<Swiper
    scrollEnabled={false}
    ref={(c) => this._swiper = c}
    index={0}
    showDots={false}
    showNextPrev={false}
>
    <ComponentOne moveNext={() => {
        //pass false tp move Next
        this._swiper.moveUpDown(false);
    }} />
    <ComponentTwo navigateBack={() => {
        //pass true to move back
        this._swiper.moveUpDown(true);
    }} />
</Swiper>
```


## 🤝 Compatibility

| 🌏 Web | 🖥 Electron | 📱 React Native |
| :---: | :--------: | :------------: |
|✅|✅|✅|

## Docs

- [Storybook](https://BlueBaseJS.github.io/plugin-native-web-swiper/storybook/)
- [API Docs](https://BlueBaseJS.github.io/plugin-native-web-swiper/)