/*
* @Author: y_4132@qq.com
* @Date:   2016-10-12 12:58:29
* @Last Modified by:   y_4132@qq.com
* @Last Modified time: 2016-10-12 17:17:40
*/

'use strict';

import React,{ Component } from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import IndexCss from './scss/bzzl-index.scss'

import IndexNav from './modules/IndexNav'

render((
	<Router history={browserHistory}>
		<Route path="/" component={IndexNav}>
			{/*<IndexRoute component={Home}/>*/}
		</Route>
	</Router>
), document.getElementById('main'));