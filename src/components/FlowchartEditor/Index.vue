<!--
 * @description     流程管理中流程图编辑插件
 *
 * @author          涂重阳
 * @email           779311998@qq.com
 * @phone           18707133663
 * @create          2019-05-15 17:00
-->
<template>
    <div class="process-edit-container">
        <div class="process-edit-aside">
            <ul class="edit-node-list">
                <li>
                    <div class="node-item" draggable="true" @dragstart="dragstart($event, 'start')" @dragend="dragend">
                        <svg height="30" version="1.1" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" preserveAspectRatio="xMinYMin">
                            <ellipse cx="15" cy="15" rx="15" ry="15" fill="#000000" stroke="none" x="0" y="0" stroke-width="0" opacity="1"></ellipse>
                        </svg>
                        <span class="name">{{$t('common.start')}}</span>
                    </div>
                </li>
                <li>
                    <div class="node-item" draggable="true" @dragstart="dragstart($event, 'end')" @dragend="dragend">
                        <svg height="30" version="1.1" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" preserveAspectRatio="xMinYMin">
                            <ellipse cx="15" cy="15" rx="13" ry="13" fill="#ffffff" stroke="#000000" x="0" y="0" stroke-width="3" opacity="1"></ellipse>
                            <ellipse cx="15" cy="15" rx="8" ry="8" fill="#000000" stroke="none" x="0" y="0" stroke-width="0" opacity="1"></ellipse>
                        </svg>
                        <span class="name">{{$t('common.end')}}</span>
                    </div>
                </li>
                <li>
                    <div class="node-item" draggable="true" @dragstart="dragstart($event, 'task')" @dragend="dragend">
                        <svg height="30" version="1.1" width="60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                            <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#000000" stroke-width="1"></rect>
                        </svg>
                        <span class="name">{{$t('form.approveNode')}}</span>
                    </div>
                </li>
                <li v-if="hasGat">
                    <div class="node-item" draggable="true" @dragstart="dragstart($event, 'exclusiveGateway')" @dragend="dragend">
                        <!-- <svg id="svgcontent" width="30" height="30" overflow="visible" xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30">
                            <g style="pointer-events:all">
                                <rect fill="#ffffff" stroke-width="3" x="5" y="5" width="24" height="24" id="svg_1" fill-opacity="1" stroke-opacity="1" transform="rotate(45)" style="transform-origin:center center;" stroke="#000000"></rect>
                                <line fill="none" stroke="#000000" stroke-width="3" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="10" y1="17" x2="25" y2="18" id="svg_2" fill-opacity="1" stroke-opacity="1" transform="rotate(45)" style="transform-origin:center center;"></line>
                                <line fill="none" stroke="#000000" stroke-width="3" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="5" y1="18" x2="20" y2="18" fill-opacity="1" stroke-opacity="1" id="svg_4" transform="rotate(-45)" style="transform-origin:center center;"></line>
                            </g>
                        </svg> -->
                        <span class="icon-svg icon-exclusiveGateway"></span>
                        <span class="name">{{$t('form.exclusiveGateway')}}</span>
                    </div>
                </li>
                <li style="display: none;">
                    <div class="node-item" draggable="true" @dragstart="dragstart($event, 'parallelGateway')" @dragend="dragend">
                        <svg id="svgcontent" width="30" height="30" overflow="visible" xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30">
                            <g style="pointer-events:all">
                                <rect fill="#ffffff" stroke-width="3" x="5" y="5" width="24" height="24" id="svg_1" fill-opacity="1" stroke-opacity="1" transform="rotate(45)" style="transform-origin:center center;" stroke="#000000"></rect>
                                <line fill="none" stroke="#000000" stroke-width="3" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="5" y1="18" x2="25" y2="18" id="svg_2" fill-opacity="1" stroke-opacity="1"></line>
                                <line fill="none" stroke="#000000" stroke-width="3" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="7" y1="-15" x2="28" y2="-15" fill-opacity="1" stroke-opacity="1" id="svg_4" transform="rotate(90) "></line>
                            </g>
                        </svg>
                        <span class="name">{{$t('form.parallelGateway')}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="process-edit-main">
            <div class="node-control">
                <div class="item item-zoom">
                    <el-button icon="el-icon-minus" @click="zoomMinus"></el-button>
                    <input type="text" v-model="zoom" readonly />
                    <el-button icon="el-icon-plus" @click="zoomPlus"></el-button>
                </div>
            </div>
            <div class="node-main" id="node-container" @wheel.prevent="scrollWheel">
                <div class="node-main-scale" id="node-main" :style="{'transform':'scale('+zoomScale+')'}" @drop="drop" @dragover.prevent @click="globalClick">
                    <div class="node-item" v-for="(node,index) in flowChart.nodes" :data-type="node.type" :key="node.id" :id="node.id" :style="node.style|styleFilter" :class="[node.id==currentNode.id?'active':'','node-item-'+node.type]" @click.stop="selectNode(node)" @drop.prevent.top="nodeOnDrop" @mouseenter="nodeMouseenter($event,node)" @mouseleave="nodeMouseleave($event,node)">
                        <!--开始-->
                        <template v-if="node.type=='start'">
                            <span class="name">{{node.name}}</span>
                            <svg height="30" version="1.1" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" preserveAspectRatio="xMinYMin">
                                <ellipse cx="15" cy="15" rx="15" ry="15" fill="#000000" stroke="none" x="0" y="0" stroke-width="0" opacity="1"></ellipse>
                            </svg>
                        </template>
                        <!--结束-->
                        <template v-if="node.type=='end'">
                            <svg height="30" version="1.1" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" preserveAspectRatio="xMinYMin">
                                <ellipse cx="15" cy="15" rx="13" ry="13" fill="#ffffff" stroke="#000000" x="0" y="0" stroke-width="3" opacity="1"></ellipse>
                                <ellipse cx="15" cy="15" rx="8" ry="8" fill="#000000" stroke="none" x="0" y="0" stroke-width="0" opacity="1"></ellipse>
                            </svg>
                            <span class="name"><code>{{node.name}}</code></span>
                        </template>
                        <template v-if="node.type=='exclusiveGateway'">
                            <!-- <svg id="svgcontent" width="36" height="36" overflow="visible" xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g style="pointer-events:all">
                                    <rect fill="#ffffff" stroke-width="3" x="5" y="5" width="24" height="24" id="svg_1" fill-opacity="1" stroke-opacity="1" transform="rotate(45)" style="transform-origin:center center;" stroke="#000000"></rect>
                                    <line fill="none" stroke="#000000" stroke-width="3" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="10" y1="17" x2="25" y2="18" id="svg_2" fill-opacity="1" stroke-opacity="1" transform="rotate(45)" style="transform-origin:center center;"></line>
                                    <line fill="none" stroke="#000000" stroke-width="3" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="10" y1="18" x2="26" y2="18" fill-opacity="1" stroke-opacity="1" id="svg_4" transform="rotate(-45)" style="transform-origin:center center;"></line>
                                </g>
                            </svg> -->
                            <span class="icon-svg icon-exclusiveGateway"></span>
                            <!-- <span class="name">{{node.name}}</span> -->
                        </template>
                        <template v-if="node.type=='parallelGateway'">
                            <svg id="svgcontent" width="30" height="30" overflow="visible" xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30">
                                <g style="pointer-events:all">
                                    <rect fill="#ffffff" stroke-width="3" x="5" y="5" width="24" height="24" id="svg_1" fill-opacity="1" stroke-opacity="1" transform="rotate(45)" style="transform-origin:center center;" stroke="#000000"></rect>
                                    <line fill="none" stroke="#000000" stroke-width="3" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="5" y1="18" x2="25" y2="18" id="svg_2" fill-opacity="1" stroke-opacity="1"></line>
                                    <line fill="none" stroke="#000000" stroke-width="3" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="7" y1="-15" x2="28" y2="-15" fill-opacity="1" stroke-opacity="1" id="svg_4" transform="rotate(90) "></line>
                                </g>
                            </svg>
                            <!-- <span class="name">{{node.name}}</span> -->
                        </template>
                        <template v-if="node.type=='task'">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                                <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#000000" stroke-width="1"></rect>
                            </svg>
                            <span class="name">{{node.name}}</span>
                        </template>
                        <div class="controls">
                            <!--连线-->
                            <!-- <div class="control-item control-line" @mousedown.stop="controlMouseDown($event, node)" @mouseup="controlMouseUp" draggable="true" @dragover.prevent @dragstart="controlDragstart($event, node)" @dragend="controlDragend"><i class="fa fa-long-arrow-up"></i></div> -->
                            <!--删除-->
                            <div class="control-item control-line" v-if="['start','end','apply'].indexOf(node.id)<=-1" @mouseup="removeNode(node,index)"><i class="el-icon-close"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="node-editor" v-if="currentNode && currentNode.id && currentNode.type=='task'">
            <el-tabs :value="editNodeTab">
                <el-tab-pane :label="$t('common.property')" name="first">
                    <el-form class="node-edit-form" ref="form" label-width="0">
                        <el-form-item>
                            <el-input :label="$t('common.nodeName')" type="text" v-model="currentNode.name"></el-input>
                        </el-form-item>
                        <!-- <el-form-item v-if="currentNode.type=='task' && currentNode.id!='apply'">
                            <UserSelect :label="$t('common.leader')" :model.sync="currentNode.user" multiple :source="workflowPlatform"></UserSelect>
                        </el-form-item>
                        <el-form-item v-if="currentNode.type=='task' && currentNode.id!='apply'">
                            <el-select type="text" v-model="currentNode.sign" placeholder="">
                                <el-option v-for="item in signList" :value="item.value" :label="item.label" :key="item.value"></el-option>
                                <div slot="prefix" class="effect-input__label" :class="{'is-active':currentNode.sign}">{{ $t('common.flowrule') }}</div>
                            </el-select>
                        </el-form-item> -->
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$t('common.style')" name="second">
                    <el-form class="node-edit-form" ref="form" label-width="70px">
                        <el-form-item :label="$t('common.width')">
                            <el-input type="text" v-model="currentNode.style.width" @input="repaintEverything"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('common.height')">
                            <el-input type="text" v-model="currentNode.style.height" @input="repaintEverything"></el-input>
                        </el-form-item>
                        <el-form-item label="x">
                            <el-input type="text" v-model="currentNode.style.left" @input="repaintEverything"></el-input>
                        </el-form-item>
                        <el-form-item label="y">
                            <el-input type="text" v-model="currentNode.style.top" @input="repaintEverything"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="node-editor" v-if="currentLine && currentLine.id">
            <el-tabs :value="editNodeTab">
                <el-tab-pane :label="$t('common.property')" name="first">
                    <el-form class="node-edit-form" ref="form" label-width="0">
                        <!---节点名称-->
                        <el-form-item>
                            <el-input :label="$t('common.nodeName')" type="text" v-model="currentLine.name"></el-input>
                        </el-form-item>
                        <!--金额限制-->
                        <el-form-item :label-width="80" v-if="currentLine.fromNode && currentLine.fromNode.type=='exclusiveGateway' && ['resource','product_application'].indexOf(workflowType)>-1">
                            <div >{{$t('common.amountLimit')}}：</div>
                            <el-row >
                                <el-col :span="12">
                                    <el-input type="number" v-model="currentLine.properties.minAmount" :label="$t('common.amountMin')"></el-input>
                                </el-col>
                                <el-col :span="12">
                                    <el-input type="number" v-model="currentLine.properties.maxAmount" :label="$t('common.amountMax')"></el-input>
                                </el-col>
                            </el-row>
                            <!-- <el-select type="text" v-model="currentLine.conditionType" placeholder="" @change="onLineTypeChange">
                                <el-option :value="item.value" :label="item.label" :key="item.value" v-for="item in conditionTypeList"></el-option>
                                <div slot="prefix" class="effect-input__label" :class="{'is-active':currentLine.conditionType}">{{ '节点类型' }}</div>
                            </el-select> -->
                        </el-form-item>
                        <!-- <el-form-item>
                            <el-select type="text" v-model="currentNode.sign" placeholder="">
                                <el-option value="1" label="任何一人审批即可通过"></el-option>
                                <el-option value="2" label="所有人审批即可通过"></el-option>
                                <div slot="prefix" class="effect-input__label" :class="{'is-active':passRule}">{{ '流转规则' }}</div>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button type="text" class="btn-primary" @click="removeLine()">{{$t('form.deleteLine')}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { jsPlumb } from 'jsplumb';
import {genNonDuplicateID} from '@/utils/index';
import {deepClone,genPostiion} from '@/utils/index';
import {resource,distribution} from './processDefault';
import i18n from '@/lang';
export default {
    components: {  },
    data() {
        var signList = [
            { value: 1, label: i18n.t('form.approveCreateTip2') },
            { value: 2, label: i18n.t('form.approveCreateTip3') }
        ]
        var conditionTypeList = [
            {value: 'pass', label: i18n.t('common.pass')},
            {value: 'notPass', label: i18n.t('common.fail')},
            {value: 'reject', label: i18n.t('common.rejectStatus')},
            {value: 'end', label: i18n.t('common.end')}
        ]
        return {
            currentNode: { style: {} },
            currentLine: { style: {},properties:{} },
            editNodeTab: 'first', //右侧编辑面板
            zoom: 100,
            controlDragEvent: {
                moveable: false
            },
            signList: signList,
            conditionTypeList: conditionTypeList,
            nodeMouseTimer: null,
        }
    },
    props: {
        flowChart: {
            type: Object,
            default: { nodes: [], lines: []}
        },
        workflowType: {
            type: String,
            default:''
        },
        workflowPlatform: {
            type: String,
            default:''
        }
    },
    computed: {
        zoomScale() {
            this.j && this.j.setZoom(this.zoom / 100);
            return this.zoom / 100;
        },
        hasGat(){
            return ['resource','product_application'].indexOf(this.workflowType)>-1;
        }
    },
    created(){
        if (!this.flowChart.nodes || !this.flowChart.nodes.length) {
            if(this.hasGat){
                this.flowChart.nodes=deepClone(resource.nodes);
                this.flowChart.lines=deepClone(resource.lines);
            }else{
                this.flowChart.nodes=deepClone(distribution.nodes);
                this.flowChart.lines=deepClone(distribution.lines);
            }
            
        }
    },
    mounted() {
        
        this.init();
        this.bindEvent();
        
    },
    filters:{
        styleFilter(style){
            var newStyle = {};
            for(let i in style){
                if(['width','height','left','top'].indexOf(i)>-1 && style[i] && style[i].toString().indexOf('px')<=-1){
                    newStyle[i] = style[i]+"px";
                }else{
                    newStyle[i] = style[i]
                }
            }
            return newStyle;
        }
    },
    methods: {
        handleClick(tab, event) {
            this.editNodeTab = tab.name;
        },
        zoomMinus() {
            if(this.zoom<=10){
                return;
            }
            this.zoom -= 10;
        },
        zoomPlus() {
            if(this.zoom>=1000){
                return;
            }
            this.zoom += 10;
        },
        globalClick() {
            this.currentNode = { style: {},properties:{} };
            this.overlayHidden();
        },
        bindEvent(){
            var dragEvent = {startX:0,startY:0,moveable:false,startL:0,startT:0};
            var moveDom = document.getElementById('node-main')
            document.body.onmousemove = (e) => {
                // 
                if (this.controlDragEvent.moveable) {
                    e.stopPropagation();
                }
                if(dragEvent.moveable){
                    var endX = dragEvent.startL + e.pageX - dragEvent.startX;
                    var endY = dragEvent.startT + e.pageY - dragEvent.startY;
                    moveDom.style.left = endX+'px'
                    moveDom.style.top = endY+'px'
                }
            }
            document.body.onmouseup = (e) => {
                this.controlDragEvent.moveable = false;
                // document.body.onmousemove = null;
                dragEvent.moveable=false;
            }
            document.getElementById('node-container').onmousedown=(e)=>{
                e.stopPropagation();
                dragEvent.moveable=true;
                dragEvent.startL = moveDom.offsetLeft;
                dragEvent.startT = moveDom.offsetTop;
                dragEvent.startX = e.pageX;
                dragEvent.startY = e.pageY;
            }
        },
        getData() {
            this.flowChart.lines = this.j.getConnections().map(item => {
                var data = {};
                data.id = item.id;
                data.from = item.source.id;
                data.to = item.target.id;
                var properties = item.getData()['properties'];
                    data.properties = properties;
                if(properties && properties.minAmount && /^\d+$/g.test(properties.minAmount) && /^\d+$/g.test(properties.maxAmount)){
                    data.conditionType = "amount";
                }
                return data;
            })
            /* 需要更新每个节点的位置 */
            var nodes = this.j.getManagedElements();
            this.flowChart.nodes = this.flowChart.nodes.map(item=>{
                item.style.left = nodes[item.id].el.offsetLeft;
                item.style.top = nodes[item.id].el.offsetTop;
                return item;
            })
            return this.flowChart;
        },
        init() {
            jsPlumb.ready(() => {
                this.j = jsPlumb.getInstance({
                    DragOptions: { cursor: 'pointer', zIndex: 2000 },
                    PaintStyle: { stroke: '#ff9600', strokeWidth: 4 }, //配置自己拖拽小点的时候连接线的默认样式
                    // HoverPaintStyle: { stroke: '#ff0000', strokeWidth: 6 },
                    Endpoint: ["Dot", { radius: 5, }], //这个是控制连线终端那个小点的半径
                    EndpointStyle: { fill: "#ff9600", r: "5" }, //这个是控制连线终端那个小点的样式
                    EndpointHoverStyle: { fill: "#ff0000" }, //这个是控制连线终端那个小点的样式
                    Connector: ["Flowchart", { curviness: 70 }],
                    Container: "node-main"
                });
                this.j.bind('beforeDrop', (info)=> {
                    // return false; //阻止任何节点拖动建立连接
                    var sourceNode = this.flowChart.nodes.find(item=>item.id==info.sourceId),
                        targetNode = this.flowChart.nodes.find(item=>item.id==info.targetId);

                    var startSourceLines = this.j.getConnections({source: info.sourceId}),//以当前节点为起点的的所有线条
                        startTargetLines = this.j.getConnections({target: info.targetId}),
                        endSourceLines = this.j.getConnections({source: info.sourceId}),
                        endTargetLines = this.j.getConnections({target: info.targetId});//以当前节点为终点的的所有线条

                    /* 自己无法连自己 */
                    if(info.sourceId == info.targetId){
                        this.$message({type: 'error',message: '无法与自己相连'});return false;
                    }
                    /* 排他网关，入口只能有一个 */
                    if(['exclusiveGateway'].indexOf(targetNode.type)>-1){
                        if(endTargetLines.length>0){
                            this.$message({type: 'error',message: '无法创建连接，【'+targetNode.name+'】节点已连接其他节点'});return false;
                        }
                    }
                    /* 除了结束节点，任务节点只能有一个出，多个入 */
                    if(['end'].indexOf(info.targetId)<=-1 && ['exclusiveGateway'].indexOf(info.sourceId)<=-1 && startSourceLines.length>0){
                        this.$message({type: 'error',message: '无法创建连接，【'+sourceNode.name+'】节点已连接其他节点'});return false;
                    }

                    // console.log(info);
                    /* 组装line */
                    var line = {
                        "conditionType": "",
                        "from": info.sourceId,
                        "id": "line_"+genNonDuplicateID(6),
                        "name": "line_"+genNonDuplicateID(6),
                        "properties": {},
                        "to": info.targetId,
                        "type": ""
                    }
                    setTimeout(()=>{
                        
                        var endpoints = info.connection.endpoints;
                        if(endpoints && endpoints.length>=2){
                            var from_uuid = endpoints[0].anchor.elementId+'_'+endpoints[0].anchor.type;
                            var to_uuid = endpoints[1].anchor.elementId+'_'+endpoints[1].anchor.type;
                            line.properties.from_uuid = from_uuid;
                            line.properties.to_uuid = to_uuid;
                            /* 先删除原来节点 */
                            this.removeLine(info.connection);
                            setTimeout(()=>{
                                this.flowChart.lines.push(line);
                                this.renderLine(line,from_uuid,to_uuid);
                                this.currentLine = line;
                                this.currentLine.fromNode = this.flowChart.nodes.find(item=>item.id==line.from);
                                this.currentLine.toNode = this.flowChart.nodes.find(item=>item.id==line.to);
                            },0)
                            
                        }
                    })
                    
                    return true;
                });
                // 请单点击一下连接线, 
                this.j.bind('click', (conn, originalEvent) => {
                    var overlays = conn.getOverlays();
                    this.currentLine = {
                        id: conn.id,
                        name: overlays.label && overlays.label.label || conn.id,
                        from: conn.sourceId,
                        to: conn.targetId,
                        conditionType: conn.getData()['conditionType'],
                        conn: conn,
                        properties: conn.getData()['properties'],
                    };
                    this.currentNode = { style: {} };
                    this.currentLine.fromNode = this.flowChart.nodes.find(item=>item.id==conn.sourceId);
                    this.currentLine.toNode = this.flowChart.nodes.find(item=>item.id==conn.targetId);
                    /* 去除所有连线高亮状态，并将当前线条高亮 */
                    var conDoms = document.getElementsByClassName('jtk-connector');
                    for(var i=0;i<conDoms.length;i++){
                        if(conDoms[i]!=conn.canvas){
                            this.resetConnStyle(conDoms[i]);
                        }
                    }

                    // console.log(this.currentLine)
                    // this.setConnActive(conn);
                    // overlays.label.label="删除"
                    this.overlayHidden();
                    overlays.label.canvas.style.display = 'block';
                    // console.log(originalEvent)
                    if(originalEvent.target && originalEvent.target.nodeName.toLocaleUpperCase()=='DIV'){
                        this.removeLine();
                    }
                })
                this.renderNodes();
                // console.log(this.j)
            });
        },
        overlayHidden(){
            var overlayDoms = document.querySelectorAll('.aLabel');
            for(let i=0;i<overlayDoms.length;i++){
                overlayDoms[i].style.display = 'none'
            }
        },
        /* 连线点击后高亮 */
        setConnActive(conn){
            var svg = conn.canvas;
            for(let i=0;i<svg.children.length;i++){
                var item = svg.children[i];
                item.setAttribute('stroke-width', 2);
                item.setAttribute('stroke', '#ff0000');
                item.setAttribute('fill', '#ff0000');
            }
        },
        dragstart(event, nodeType) {
            var name = this.getNodeTypeName(nodeType);
            
            event.dataTransfer.setData('nodeType', nodeType)
            event.dataTransfer.setData('eventData', JSON.stringify({ offsetX: event.offsetX, offsetY: event.offsetY, name: name }));
        },
        dragend(event) {
            event.dataTransfer.clearData();
        },
        getNodeTypeName(nodeType){
            var name= "";
            switch (nodeType) {
                case 'start':
                    name = '开始';
                    break;
                case 'end':
                    name = '结束';
                    break;
                case 'task':
                    name = '任务';
                    break;
                case 'exclusiveGateway':
                    name = '排他网关';
                    break;
            }
            return name;
        },
        getLineTypeName(lineType){
            var line = this.conditionTypeList.find(item=>item.value==lineType);
            return line&&line.label||'';
        },
        /* 主体区域接收拖拽事件与拖拽元素 */
        drop(event) {
            let nodeType = event.dataTransfer.getData('nodeType');
            let eventData = JSON.parse(event.dataTransfer.getData('eventData'));
            if(['start','end'].indexOf(nodeType)>-1){
                this.$message({type:'error',message: '起点或终点只能有一个',duration:1500,showClose: true});return;
            }
            var nodeItem = {
                name: eventData.name,
                id: 'node_'+genNonDuplicateID(6),
                type: nodeType,
                style: {
                    left: event.offsetX - eventData.offsetX,
                    top: event.offsetY - eventData.offsetY,
                },
                user: ""
            }
            this.flowChart.nodes.push(nodeItem)
            this.renderNode(nodeItem);
        },
        renderNode(item) {
            setTimeout(() => {
                let commonOpt = {
                    uuid: item.id,
                    anchor: "TopCenter",
                    isSource: true,
                    isTarget: true,
                    // maxConnections: 1,
                }
                this.j.draggable(item.id, { });// 参数{ containment: 'parent' }控制节点只能在当前容器内拖动
                this.j.addEndpoint(item.id, { anchor: 'Left', uuid: item.id+'_'+'Left', isSource: true, isTarget: true, });
                this.j.addEndpoint(item.id, { anchor: 'Right', uuid: item.id+'_'+'Right', isSource: true, isTarget: true, });
                this.j.addEndpoint(item.id, { anchor: 'Top', uuid: item.id+'_'+'Top', isSource: true, isTarget: true, });
                this.j.addEndpoint(item.id, { anchor: 'Bottom', uuid: item.id+'_'+'Bottom', isSource: true, isTarget: true, });
            })
        },
        renderNodes() {
            setTimeout(()=>{
                this.flowChart.nodes.map(item => {
                    this.renderNode(item);
                })
            })
            
            setTimeout(() => {
                this.renderLines();
            })
        },
        getAvaliblePoints(item){
            var getNewAnchor = (endpoints, type) => {
                var anchorDefaults = type == 'from' ? ['Bottom', "Left", "Right", "Top"] : ['Top', "Left", "Right", "Bottom"];
                /* 去掉已经连接了点 */
                endpoints.forEach(itemP=>{
                    if(itemP.connections && itemP.connections.length>0){
                        anchorDefaults.splice(anchorDefaults.indexOf(itemP.anchor.type),1)
                    }
                })
                return anchorDefaults;
            }
            var fromEndpoints = this.j.getEndpoints(item.from);
            var toEndpoints = this.j.getEndpoints(item.to);
            var fromAnhors = getNewAnchor(fromEndpoints, 'from');
            var toAnhors = getNewAnchor(toEndpoints, 'to');

            /* 当起点是Left时，终点也是Left，起点是Right，终点设置成Right */
            // var toAnhor = (toAnhors.find(item => item == fromAnhors[0]) && (fromAnhors[0] == 'Left' || fromAnhors[0] == 'Right')) ? fromAnhors[0] : toAnhors[0];
            var toAnhor = toAnhors[0];
            var from_uuid = item.from +'_' + fromAnhors[0];
            var to_uuid = item.to + '_'+toAnhor;
            return {
                from_uuid: from_uuid,
                to_uuid: to_uuid,
                fromAnhor: fromAnhors[0],
                toAnhor: toAnhor
            }
        },
        renderLine(line,from_uuid,to_uuid){
            if(from_uuid && to_uuid){

            }else if(line.properties && line.properties.from_uuid && line.properties.to_uuid){
                var from_uuid = line.properties.from_uuid;
                var to_uuid = line.properties.to_uuid;
            }else{
                var {from_uuid,to_uuid,fromAnhor,toAnhor} = this.getAvaliblePoints(line);
            }
            
            /* 计算label */
            // var label = this.getLineTypeName(line.conditionType);
            setTimeout(() => {
                this.j.connect({
                    uuids: [from_uuid, to_uuid],
                    overlays: [
                        ['Arrow', { width: 12, length: 12, location: 1 }],
                        ["Label", {
                            location: 0.5,
                            label: 'x',
                            id: "label",
                            cssClass: "aLabel"
                        }]
                    ],
                    maxConnections: 1,
                    data: {
                        conditionType: line.conditionType || '',
                        properties: line.properties || {},
                        from_uuid: from_uuid,
                        to_uuid: to_uuid
                    }
                })
                setTimeout(()=>{
                    this.onHover();
                })
            })
        },
        renderLines() {
            var i = 0,timeout;
            var timer = ()=>{
                this.renderLine(this.flowChart.lines[i++]);
                if(i>=this.flowChart.lines.length){
                    window.clearTimeout(timeout);
                }else{
                    timeout = setTimeout(()=>{
                        timer();
                    })
                }
            }
            setTimeout(()=>{
                timer()
            })
            
        },
        /* 节点点击事件 */
        selectNode(node) {
            this.currentNode = node;
            this.currentLine = { style: {},properties:{} };
            this.overlayHidden();
        },
        controlMouseDown(e) {
            this.controlDragEvent.moveable = true;
        },
        controlMouseUp(e) {
            this.controlDragEvent.moveable = false;
        },
        /* 连线拖拽开始 */
        controlDragstart(e, node) {
            e.stopPropagation();
            e.dataTransfer.setData('startNodeId', node.id);
            e.dataTransfer.setData('startNodeType', node.type);
        },
        /* 连线拖拽结束 */
        controlDragend(e) {
            e.dataTransfer.clearData();
        },
        /* 节点监听拖拽 */
        nodeOnDrop(e) {
            e.stopPropagation()
            var startNodeId = e.dataTransfer.getData('startNodeId');
            var startNodeType = e.dataTransfer.getData('startNodeType');
            var endNodeId = "";
            for (var i = 0; i < e.path.length; i++) {
                if (e.path[i].classList.contains('node-item')) {
                    endNodeId = e.path[i].id;
                    break;
                }
            }
            /* 非排他网关，起点只能有一个出口 */
            var startSourceLines = this.j.getConnections({source: startNodeId}),//以当前节点为起点的的所有线条
                startTargetLines = this.j.getConnections({target: startNodeId}),
                endTargetLines = this.j.getConnections({source: endNodeId}),
                endTargetLines = this.j.getConnections({target: endNodeId});//以当前节点为终点的的所有线条

            /* 自己无法连自己 */
            if(startNodeId == endNodeId){
                this.$message({type: 'error',message: '无法与自己相连'});return;
                return;
            }
            if(startNodeType!='exclusiveGateway'){
                if(startSourceLines.length>0){
                    this.$message({type: 'error',message: '无法创建连接，该节点已连接其他节点'});return;
                }else if(endTargetLines.length>0){
                    this.$message({type: 'error',message: '无法创建连接，终止节点已连接其他节点'});return;
                }
            }
            var id = genNonDuplicateID(6)
            var line = {
                "id": "line_"+id,
                "from": startNodeId,
                "to": endNodeId,
                "name": "line_"+id,
                "conditionType": null,
                "properties":{}
            }
            this.renderLine(line);
        },
        removeNode(node,index) {
            this.$confirm('确认删除该节点吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var sourceLines = this.j.getConnections({source:node.id});//以当前节点为起点的的所有线条
                var targetLines = this.j.getConnections({target:node.id});//以当前节点为终点的的所有线条
                //将每条线的端点移除

                this.$message({type: 'success',message: '删除成功!'});
                this.j.remove(node.id);
                this.currentNode = {style: {}};
                /* 将改节点从数组中删除 */
                this.flowChart.nodes.splice(index,1);
                /* 删除与该节点相连的线 */
                this.flowChart.lines = this.flowChart.lines.filter(item=>item.from==node.id || item.to==item.id)
            }).catch(() => {});
            
        },
        removeLine(conn){
            if(!conn){
                conn = this.currentLine.conn
            }
            // console.log(conn)
            this.j.deleteConnection(conn,{force:true})
            this.currentLine= { style: {},properties:{} }
        },
        /* 鼠标滚轮放大缩小 */
        scrollWheel(wheel) {
            if(this.zoom<=10 && wheel.deltaY>0){
                return;
            }
            if(this.zoom>=1000 && wheel.deltaY<0){
                return;
            }
            this.zoom -= wheel.deltaY / 10;
            this.j.setZoom(this.zoom)
        },
        /* 线条节点类型切换 */
        onLineTypeChange() {
            var overlays = this.currentLine.conn.getOverlays();

            var typeName = this.getLineTypeName(this.currentLine.conditionType);
            overlays.label.label = typeName;
            overlays.label.canvas.innerHTML = typeName;
            this.currentLine.conn.setData({conditionType: this.currentLine.conditionType})
        },
        nodeMouseenter(e,node){
            var points = this.j.getEndpoints(node.id);
            // for(let i=0;i<points.length;i++){
            //     points[i].canvas.style.display = 'block';
            // }
            // window.clearTimeout(this.nodeMouseTimer);
        },
        nodeMouseleave(e,node){
            var points = this.j.getEndpoints(node.id);
            // this.nodeMouseTimer = setTimeout(()=>{
            //     for(let i=0;i<points.length;i++){
            //         points[i].canvas.style.display = 'none';
            //     }
            // })
        },
        //线条滑动与点击事件
        onHover(){
            var conDoms = document.getElementsByClassName('jtk-connector');
            for(var i=0;i<conDoms.length;i++){
                conDoms[i].onmouseenter = (e)=>{
                    // e.stopPropagation();
                    var pathDoms = e.target.children;
                    for(let i=0;i<pathDoms.length;i++){
                        if(pathDoms[i].getAttribute('stroke-width')){
                            pathDoms[i].setAttribute('stroke-width','6');
                            pathDoms[i].setAttribute('stroke','#ff0000');
                        }
                        if(pathDoms[i].getAttribute('fill') && pathDoms[i].getAttribute('fill')!='none'){
                            pathDoms[i].setAttribute('fill','#ff0000');
                        }
                    }
                }
                conDoms[i].onmouseleave = (e)=>{
                    // e.stopPropagation();
                    if(this.currentLine && this.currentLine.id){
                        if(this.currentLine.conn && this.currentLine.conn.canvas==e.target){
                            return;
                        }
                        
                    }
                    this.resetConnStyle(e.target);
                }
            }
        },
        resetConnStyle(svgTarget){
            var pathDoms = svgTarget.children;
            for(let i=0;i<pathDoms.length;i++){
                if(pathDoms[i].getAttribute('stroke-width')){
                    pathDoms[i].setAttribute('stroke-width','4');
                    pathDoms[i].setAttribute('stroke','#ff9600');
                }
                if(pathDoms[i].getAttribute('fill') && pathDoms[i].getAttribute('fill')!='none'){
                    pathDoms[i].setAttribute('fill','#ff9600');
                }
            }
        },
        repaintEverything(){
            setTimeout(()=>{
                this.j.repaintEverything();
            })
            
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/css/variables.scss';
$bordercolor: #ddd;

.process-edit-container {
    height: 700px;
    border-bottom: 1px solid $bordercolor;
    position: relative;
    overflow: hidden;

    .process-edit-main {
        padding: 0;
        height: 100%;
        overflow: hidden;
        position: relative;

        // margin-right: 300px;
        .node-control {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 20;

            .el-button {
                border-radius: 50%;
                padding: 0;
                width: 20px;
                line-height: 20px;
                text-align: center;
            }
        }
    }

    .node-main {
        width: 100%;
        height: 100%;
        background: url(~@/assets/images/line-bg.png);
        position: relative;

        .node-main-scale {
            transform-origin: top left !important;
            transition: transform .3s;
            width: 100%;
            height: 100%;
            position: relative;
        }

        .node-item {
            position: absolute;
            padding: 0 10px;
            border: 1px solid transparent;

            .controls {
                position: absolute;
                left: 100%;
                top: 0;
                display: none;
                width: 60px;

                .control-item {
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    float: left;

                    &:hover {
                        background: $gray-5;
                    }
                }
            }

            &:hover {
                border: 1px solid $orange-auto;
            }

            &.active {
                border: 1px dashed #ff0000;

                .controls {
                    display: block;
                }
            }

            &.node-item-start {
                padding: 0;
                .name {
                    position: absolute;
                    bottom: 100%;
                    white-space: nowrap;
                }

            }

            &.node-item-end {
                padding: 0;
                .name {
                    position: absolute;
                    top: 100%;
                }
            }

            &.node-item-exclusiveGateway {
                padding: 0;
            }

            .name {}
        }
    }

    .node-editor {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        width: 300px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .1);

        .el-tabs__nav {
            width: 100%;

            .el-tabs__item {
                text-align: center;
                width: 50%;
                box-shadow: none !important;
            }
        }
    }

    .process-edit-aside {
        width: 300px;
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, .1);

        &+.process-edit-main {
            margin-left: 300px;
        }
    }
}

.edit-node-list {
    margin-top: 15px;
    font-size: 0;

    li {
        width: 33.3333333%;
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        margin: 0 0 15px 0;
        text-align: center;

        .node-item {
            border: 0;
        }
    }
}

.node-item {
    display: inline-block;
    // border: 1px solid #ff9600;
    line-height: 30px;
    min-height: 30px;
    // padding: 0 20px;
    user-select: none;
    text-align: center;

    &.active {
        border-width: 2px;
    }

    .name {
        display: block;
    }

    svg {
        vertical-align: top;
    }

    &.node-item-task {
        min-width: 70px;

        svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}


.node-editor {}

.node-edit-form {
    margin: 15px 15px 0 15px;
    /deep/{
        .el-input__inner{
            border-top: 0;
            border-left: 0;
            border-right: 0;
        }
        .el-select{
            .el-input__inner{
                padding-left: 0;
                padding-right: 0;
            }
        }
    }
}
.aLabel{
    padding-left: 15px;
    cursor: pointer;
    display: none;
    &:hover{
        color: red;
    }
}
.jtk-endpoint{
    // display: none;
    cursor: crosshair;
}
.jtk-connector{
    cursor: pointer;
}
.node-control {
   
    .item-zoom {
        white-space: nowrap;

        .el-button {
            display: inline-block;
            border-radius: 50%;
            padding-left: 12px;
            padding-right: 12px;
        }

        input {
            display: inline-block;
            width: 40px;
            padding: 0 5px;
            text-align: center;
            border:0;
            line-height: 30px;
            background: none;
            outline: none;
            color: #999;
            font-size: 12px;
        }
    }
}
</style>
