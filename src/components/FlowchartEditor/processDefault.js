import i18n from '@/lang';

export let resource = {
    nodes: [{
            "documentation": "",
            "id": "start",
            "name": i18n.t("common.start"),
            "properties": null,
            "role": "",
            "style": {
                "left": 220,
                "top": 30
            },
            "type": "start",
            "uname": "",
            "user": ""
        },
        {
            "documentation": "",
            "id": "apply",
            "name": i18n.t("common.apply"),
            "properties": null,
            "role": "",
            "style": {
                "left": 201,
                "top": 116
            },
            "type": "task",
            "uname": "",
            "user": ""
        },
        {
            "documentation": "",
            "id": "usertask1",
            "name": i18n.t('common.approvalOfSuperior'),
            "properties": null,
            "role": "",
            "sign": 1,
            "style": {
                "left": 197,
                "top": 200
            },
            "type": "task",
            "uname": "",
            "user": ""
        },
        {
            "documentation": "",
            "id": "exclusiveGateway",
            "name": i18n.t("form.exclusiveGateway"),
            "properties": null,
            "role": "",
            "style": {
                "left": 217,
                "top": 290
            },
            "type": "exclusiveGateway",
            "uname": "",
            "user": ""
        },
        {
            "documentation": "",
            "id": "usertask2",
            "name": i18n.t("common.approvalPresident"),
            "properties": null,
            "role": "",
            "style": {
                "left": 197,
                "top": 385
            },
            "type": "task",
            "uname": "",
            "user": ""
        },
        {
            "documentation": "",
            "id": "end",
            "name": i18n.t("common.end"),
            "properties": null,
            "role": "",
            "style": {
                "left": 220,
                "top": 470
            },
            "type": "end",
            "uname": "",
            "user": ""
        }
    ],
    lines: [{
            "conditionType": "",
            "from": "start",
            "id": "flow1",
            "name": "flow1",
            "properties": null,
            "to": "apply",
            "type": ""
        },
        {
            "conditionType": "",
            "from": "apply",
            "id": "flow2",
            "name": "flow1",
            "properties": null,
            "to": "usertask1",
            "type": ""
        },
        {
            "conditionType": "",
            "from": "usertask1",
            "id": "flow3",
            "name": "flow2",
            "properties": null,
            "to": "exclusiveGateway",
            "type": ""
        },
        {
            "conditionType": "amount",
            "from": "exclusiveGateway",
            "id": "flow4",
            "name": "flow4",
            "properties": null,
            "to": "usertask2",
            "type": ""
        },
        {
            "conditionType": "",
            "from": "usertask2",
            "id": "flow5",
            "name": "flow5",
            "properties": null,
            "to": "end",
            "type": ""
        },
        {
            "conditionType": "amount",
            "from": "exclusiveGateway",
            "id": "flow7",
            "name": "flow7",
            "properties": null,
            "to": "end",
            "type": ""
        }
    ]
}

export let distribution = {
    nodes: [{
            "documentation": "",
            "id": "start",
            "name": i18n.t("common.start"),
            "properties": null,
            "role": "",
            "style": {
                "left": 220,
                "top": 30
            },
            "type": "start",
            "uname": "",
            "user": ""
        },
        {
            "documentation": "",
            "id": "apply",
            "name": i18n.t("common.apply"),
            "properties": null,
            "role": "",
            "style": {
                "left": 201,
                "top": 130
            },
            "type": "task",
            "uname": "",
            "user": ""
        },
        {
            "documentation": "",
            "id": "usertask1",
            "name": i18n.t('common.approvalOfSuperior'),
            "properties": null,
            "role": "",
            "sign": 1,
            "style": {
                "left": 197,
                "top": 230
            },
            "type": "task",
            "uname": "",
            "user": ""
        },

        {
            "documentation": "",
            "id": "usertask2",
            "name": i18n.t("common.approvalPresident"),
            "properties": null,
            "role": "",
            "style": {
                "left": 197,
                "top": 340
            },
            "type": "task",
            "uname": "",
            "user": ""
        },
        {
            "documentation": "",
            "id": "end",
            "name": i18n.t("common.end"),
            "properties": null,
            "role": "",
            "style": {
                "left": 220,
                "top": 470
            },
            "type": "end",
            "uname": "",
            "user": ""
        }
    ],
    lines: [{
            "conditionType": "",
            "from": "start",
            "id": "flow1",
            "name": "flow1",
            "properties": null,
            "to": "apply",
            "type": ""
        },
        {
            "conditionType": "",
            "from": "apply",
            "id": "flow2",
            "name": "flow1",
            "properties": null,
            "to": "usertask1",
            "type": ""
        },
        {
            "conditionType": "",
            "from": "usertask1",
            "id": "flow3",
            "name": "flow2",
            "properties": null,
            "to": "usertask2",
            "type": ""
        },
        {
            "conditionType": "",
            "from": "usertask2",
            "id": "flow5",
            "name": "flow5",
            "properties": null,
            "to": "end",
            "type": ""
        }
    ]
}

let dingform = {
	recharge:['云服务商','充值用途','预期充值时间','充值云账号','预期充值金额','备注'],
	budget: ['用途','类型','预计使用时间','预算明细','预算合计'],
	transfer: ['云服务商','签约客户','出账方云账号','入账方云账号','预计划拨日期','预计划拨额度','预计回款金额','备注','划拨附件'],
	invoice: ['云平台','开票类型','开具类型','发票类型','发票性质','客户类型','收票客户','发票金额','开票时间','发票抬头','收件人姓名','收件人电话','收件地址','发票备注','附件'],
	agreement:['合同编号','签约客户','合同类型','签约时长','回款截止时长','发票截止时长','折扣','附件','合同详情']
}
let dingdingFormData = {};
for(let i in dingform){
	dingdingFormData[i]=dingform[i].map((item,index)=>{
		var sIndex = index+1;
    	return {
            "componentName": "TextField",
            "type": "text",
            "props": {
                "placeholder": "请输入",
                "label": item,
                "id": "TextField-form"+Array(5-(sIndex+'').length).join('0')+sIndex,
                "required": false
            }
        }
    })
}
export let dingdingForm = dingdingFormData;