import React from "react";

import { Drawer, Divider, Button, message, Avatar, Form, Input } from "antd";
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 6 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 16 },
};
class CartDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      overAllamount: 0
    };
  }

  totalCountFunc = (cart_list) => {
    let overAllamount1 = 0;
    cart_list.forEach(element => {
      overAllamount1 = overAllamount1 + element.total_price
    });
    // this.setState({ overAllamount: overAllamount1 });
    return overAllamount1
  }
  handleForgetPasswordSubmit = (e, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          console.log(values)
          const { form, cart_list = [], isModalVisible } = this.props;
          const reqData ={
            ...values,
            orderItem:cart_list.map(oItem=>{
              return{
                _id:oItem._id,
                total_item:oItem.total_item,
                total_price:oItem.total_price
              }
            })
          }
          console.log("reqData",reqData)
          await this.addOrderlist(reqData)

        } catch (error) {

        }
      }
    });
  };
  addOrderlist = (values = {}) => {
    return fetch("http://localhost:4444/user/addOrderData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        message.success(responseJson.msg);
        return responseJson;
      })
      .catch((error) => {
        message.error(error);
      });
  };

  render() {
    const { form, cart_list = [], isModalVisible } = this.props;
    const { getFieldDecorator } = form;
    const FormItem = Form.Item;
    return (
      <Drawer
        title="Cart List"
        width={720}
        onClose={() => this.props.modalVisibleFunc(false)}
        visible={isModalVisible}
        bodyStyle={{ paddingBottom: 80 }}
      ><div>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "16px",
            fontWeight: 'bold',
            paddingRight: '100px'
          }}>Total Item:{cart_list && cart_list.length}</div>{cart_list.map((cItem, cIndex) => <div key={cIndex} style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
            <span >

              <Avatar shape="square" size={80} 
              src={ `http://localhost:4444/${cItem.image_name}`}
              />
            </span>
            <span style={{
              alignItems: "center",
              display: "flex"
            }}>
              <span>
                <div style={{ paddingLeft: 30 }}>{cItem.product_name}</div>
                <div style={{ paddingLeft: 30, paddingTop: 30 }}>price ${cItem.price}</div>
              </span>

            </span>
            <span style={{
              alignItems: "center",
              display: "flex",
              paddingLeft: 40
            }}>
              <span style={{}}>
                <Button
                  icon="plus"
                  onClick={() => this.props.addItemFunc(cItem)}
                />

              </span>
              <span style={{ padding: 10 }}>{cItem.total_item}</span>
              <span>
                <Button
                  icon="minus"
                  onClick={() => this.props.minesItemFunc(cItem)}
                />

              </span>
            </span>
            <span style={{
              alignItems: "center",
              display: "flex", paddingLeft: 60
            }}>Total: {cItem.total_price}</span>
            <span style={{
              alignItems: "center",
              display: "flex", paddingLeft: 60
            }}> <Button
              icon="delete"
              type="danger"
              onClick={() => this.props.deleteItemFunc(cItem)}
            ></Button></span>
          </div>)}
          {cart_list && cart_list.length ? <Divider /> : null}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "16px",
            fontWeight: 'bold',
            paddingRight: '100px'
          }}>Total Price:{this.totalCountFunc(cart_list)}</div>
          {cart_list && cart_list.length ? <div>
            <Form
              onSubmit={(e) => this.handleForgetPasswordSubmit(e, form)}>
              <FormItem {...formItemLayout} label={"Full name"}>
                {getFieldDecorator("full_name", {
                  initialValue: undefined,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "Please enter full name",
                    },
                  ],
                })(<Input placeholder={"Enter full name"} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={"Email Id"}>
                {getFieldDecorator("email_id", {
                  initialValue: undefined,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      type: "email",
                      message: "Please email id",
                    },
                  ],
                })(<Input placeholder={"Enter Email id"} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={"Address"}>
                {getFieldDecorator("address", {
                  initialValue: undefined,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "Please Enter Address",
                    },
                  ],
                })(<Input placeholder={"Enter Address"} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={"Phone No."}>
                {getFieldDecorator("phone_number", {
                  initialValue: undefined,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "Please Enter Phone No.",
                    },
                  ],
                })(<Input placeholder={"Enter Phone No."} />)}
              </FormItem>
              <FormItem>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
              </Button>
              </FormItem>
            </Form>
          </div> : null}
        </div></Drawer>
    );
  }
}

export default Form.create()(CartDrawer);
