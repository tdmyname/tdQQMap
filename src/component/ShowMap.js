/**
 * Author：Mr.tan
 * Create Date：2017/8/23
 * Modified By：Mr.tan
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import React from "react"
import path from "path"
class ShowMap extends React.Component {
    constructor(props) {
        super(props)
        this.state={searchService:"",markers :[]}
    }
    showMap = (div) => {
     const map=   new qq.maps.Map(div,{center: new qq.maps.LatLng(39.916527,116.397128),
         //初始化地图级别
         zoom:10,
         //地图最小缩放级别
         minZoom:10,
         mapTypeControl:false,
         //缩放类型 当前为手指中心位置。  CENTER：中心点位置缩放
         mapZoomType: qq.maps.MapZoomType.DEFAULT,
         //地图比例尺控件，若为false则不显示比例尺控件
         scaleControl: true,
         //地图比例尺控件参数
         scaleControlOptions: {
             position: qq.maps.ControlPosition.BOTTOM_RIGHT
         },
         //地图缩放控件，若为false则不显示缩放控件
         zoomControl: true,
         //地图缩放控件参数
         zoomControlOptions: {
             position: qq.maps.ControlPosition.TOP_LEFT
         },
    })
        qq.maps.event.addListener(map, 'click', function(event) {
            const anchor = new qq.maps.Point(12,39),
                size = new qq.maps.Size(28, 36),
                origin = new qq.maps.Point(0, 0),
                icon = new qq.maps.MarkerImage(
                   ` ${path.resolve(__dirname, "/src/image/map.png")}`,
                    size,
                    origin,
                    anchor
                )
            const addcenter = new qq.maps.LatLng(event.latLng.getLat(),event.latLng.getLng())
            const marker = new qq.maps.Marker({
                position: addcenter,
                map: map
            })
            marker.setIcon(icon)
        })
        const latlngBounds = new qq.maps.LatLngBounds()
     const markers=[]
        this.setState({searchService: new qq.maps.SearchService({
            //设置搜索范围为北京
            location: "北京",
            //设置搜索页码为1
            pageIndex: 1,
            //设置每页的结果数为5
            pageCapacity: 100,
            //设置展现查询结构到infoDIV上 （暂不需要）
            panel: document.getElementById('infoDiv'),
            //设置自动扩大检索区域。默认值true，会自动检索指定城市以外区域。
            autoExtend: true,
            //检索成功的回调函数
            complete: function(results) {
                //设置回调函数参数
                const pois = results.detail.pois
                //打印返回参数
                console.log(JSON.stringify(pois))
                const info = new qq.maps.InfoWindow({
                    map: map
                })
                for (let i = 0, l = pois.length; i < l; i++) {
                    const poi = pois[i]
                    //扩展边界范围，用来包含搜索到的Poi点
                    latlngBounds.extend(poi.latLng)
                    const marker = new qq.maps.Marker({
                        map: map,
                        position: poi.latLng
                    })
                    marker.setTitle(i + 1)
                    markers.push(marker)

                    //标记Marker点击事件
                    qq.maps.event.addListener(marker, 'click', function() {
                        info.close()
                        info.open()
                        info.setContent(`<div style="text-align:center;white-space:nowrap;''margin:10px;">${JSON.stringify(poi)}</div>`)
                        info.setPosition(marker.getPosition())
                    });
                }
                //调整地图视野
                map.fitBounds(latlngBounds)
            },
            //若服务请求失败，则运行以下函数
            error: function() {
                alert("出错了。")
            }
        })})
        this.setState({markers:markers})
    }
    searchKeyword = () => {
        const value=document.getElementById("seek").value
        this.state.searchService.search(value);
    }
    componentWillMount() {
        const timer = setInterval(() => {
            const tencenMap = document.getElementById("tencenMap")
            if (tencenMap !== null) {
                clearInterval(timer)
                this.showMap(tencenMap)
            }
        }, 1000)
    }

    render() {
        return (
            <div>
            <div id="tencenMap" style={{height: "500px", width: "100%"}}/>
                <input id="seek"/>
            <input type="button" value="搜索" onClick={()=>this.searchKeyword()}/>
            </div>
        )
    }
}
export default ShowMap