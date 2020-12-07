import React,{Component} from 'react'
import { Form, Button, Table,message} from 'antd'
import {reqStatisticsSum} from '../../service/service'
const {Item} = Form
export default class StatisticsSum extends Component {
  state = {
    financialStatisticsList:[],
    columns: [
      {title: '金币名称',dataIndex: 'name',key: 'name'},
      {title: '充币总数',dataIndex: 'total_charge',key: 'total_charge'},
      {title: '提币总数',dataIndex: 'total_withdrawals',key: 'total_withdrawals'},
      {title: '充提币差额',dataIndex: 'total_difference',key: 'total_difference'},
      {title: '合计',dataIndex: 'total',key: 'total'},
      {title: '总金额',dataIndex: 'sun',key: 'sun',ellipsis: true},
      {title: '挂单进行中',dataIndex: 'trade',key: 'trade'},
      {title: '订单进行中',dataIndex: 'TradeOrder',key: 'TradeOrder'},
      {title: '委托挂单中',dataIndex: 'delegate',key: 'delegate'},
      {title: '置换中',dataIndex: 'Transfer',key: 'Transfer'},
      {title: '当日成交均价',dataIndex: 'daily_average_price',key: 'daily_average_price'},
    ]
  }
  componentDidMount() {
    this.getStatisticsSumList()
  }
  getStatisticsSumList = async () => {
    const res = await reqStatisticsSum()
    console.log(res)
    if(res.status === 1) {
      // 保存数据
      this.setState({financialStatisticsList:res.data})
    } else message.error(res.msg)
  }
  
  render() {
    const {financialStatisticsList,columns} = this.state
    return (
      <div className="member-behavior">
        <div className="card">
          <Item><Button type="primary" onClick={this.getStatisticsSumList}>刷新</Button></Item>
          <div className="card-body">
          <Table 
            dataSource={financialStatisticsList} 
            columns={columns}
            bordered
            rowKey="id"
            loading={financialStatisticsList.length === 0}
          />
          </div>
        </div>
      </div>
    )
  }
}