/**
 * Author：Mr.tan
 * Create Date：2017/8/24
 * Modified By：Mr.tan
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import React from "react"
import ReactDom from "react-dom"
import TencenMap from "./component/ShowMap"
const container = document.createElement('div')
container.setAttribute("class", "container")
document.body.appendChild(container)
ReactDom.render(
    <TencenMap/>,
    container
)