/*
 * @Author: y_4132@qq.com
 * @Date:   2016-10-12 16:28:55
 * @Last Modified by:   y_4132@qq.com
 * @Last Modified time: 2016-10-12 18:26:34
 */

'use strict';
import React, { Component } from 'react'

import Style from './../scss/bzzl-index.scss'

import NavList from './../data/NavListData.json';

export default class extends Component {
	render() {
		return (
			<section className={Style['main-left']}>
				<nav>
					<ul>
						{
							NavList.map((item,index) => {
								return (
									<li key={'navList-' + index}><a to={item.link}><span className={Style[item.className]}></span>{item.contentText+`(${item.articleNumber})`}</a></li>
								)
							})
						}
					</ul>
				</nav>
		</section>
		)
	}
}