import React from "react";
import ContainerLayout from "globals/components/ContainerLayout";
import Header from "globals/components/Header";
import CartDrawer from "./drawer";
import { Drawer, Row, Col, Card, Form, Input, Button, message, Avatar } from "antd";
import "./home.style.scss";
const style = { padding: "8px 8px " };
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      cart_list: [],
      isModalVisible: false,
      productList:[]
    };
  }
  componentDidMount = () => {
    this.callAllProductlist()
  };
  callAllProductlist = (values = {}) => {
    return fetch("http://localhost:4444/user/get_product", {
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
        this.setState({ productList: responseJson.data });
        return responseJson;
      })
      .catch((error) => {
        message.error(error);
      });
  };

  handleAddToCartFunc = (record) => {
    try {
      const { cart_list = [] } = this.state;
      const isProductExist = cart_list.some(cItem => cItem._id === record._id)
      if (isProductExist) {
        message.warning(`${record.product_name} already added in cart`);
        return
      }
      let totalCartList = cart_list
      totalCartList.push({ ...record, total_item: 1 ,total_price:record.price})
      this.setState({ cart_list: totalCartList });
    } catch (error) {
      console.log(error)
    }
  }
  modalVisibleFunc = (visible) => {
    this.setState({ isModalVisible: visible });

  };
  addItemFunc = (record) => {
    console.log("sldjf", record)
    const { cart_list = [] } = this.state;
    let updatedItem = cart_list.map(clItem => {
      if (record._id === clItem._id) {
        return {
          ...clItem,
          total_item: clItem.total_item + 1,
          total_price:((clItem.total_item + 1)*record.price)
        }
      } else {
        return clItem
      }
    })
    this.setState({ cart_list: updatedItem });
  }


  minesItemFunc = (record) => {
    if (record.total_item === 1) {
      message.warning(`Item atlist one required`);
      return
    }
    const { cart_list = [] } = this.state;
    let updatedItem = cart_list.map(clItem => {
      if (record._id === clItem._id) {
        return {
          ...clItem,
          total_item: clItem.total_item - 1,
          total_price:((clItem.total_item - 1)*record.price)
        }
      } else {
        return clItem
      }
    })
    this.setState({ cart_list: updatedItem });
  }
  deleteItemFunc = (record) => {
  
    const { cart_list = [] } = this.state;
    let updatedItem = cart_list.filter(clItem => {
      if (record._id !== clItem._id) {
        return {
          ...clItem
        }
      } 
    })
    this.setState({ cart_list: updatedItem });
  }
  render() {
    const { form } = this.props;

    const {  productList = [], cart_list = [] } = this.state;
    const { Meta } = Card;
    return (
      <ContainerLayout>
        <div className="home">
          <div>
            <Button
              icon="shopping-cart"
              onClick={() => this.modalVisibleFunc(true)}
            >
              cart {cart_list && cart_list.length}
            </Button>
            <Button
             
              onClick={() => this.callAllProductlist({product_name:1})}
            >
              Short by name
            </Button>
            <Button
              icon="shopping-cart"
              onClick={() => this.callAllProductlist({price:1})}
            >
              Short by Price
            </Button>
          </div>
          <Row gutter={[16, 24]}>
            {productList.map((pitem, pIndex) => (
              <Col style={{ padding: 10 }} key={pIndex} className="gutter-row" span={6}>
                <div style={style}>
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                        alt="example"
                        src={ `http://localhost:4444/${pitem.image_name}`}
                      />
                    }
                    actions={[
                      <Button
                        icon="plus"
                        onClick={() => this.handleAddToCartFunc(pitem)}
                      >
                        Add To Cart
              </Button>
                    ]}
                  >
                    <Meta
                      
                      title={pitem.product_name}
                      description={`Price $ ${pitem.price}`}
                    />
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
          <CartDrawer {...this.state}
            addItemFunc={this.addItemFunc}
            minesItemFunc={this.minesItemFunc}
            modalVisibleFunc={this.modalVisibleFunc} 
            deleteItemFunc={this.deleteItemFunc} />
        </div>
      </ContainerLayout>
    );
  }
}

export default Home;
