import {Button, Col, Row, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import formatter from "../utils/currencyFormatter";
import {LinkContainer} from "react-router-bootstrap";
import {useEffect} from "react";
import {listMyOrders} from "../actions/orderActions";

const OrdersScreen = ({ location, history }) => {

    const dispatch = useDispatch()

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(listMyOrders())
        }
    }, [dispatch, history, userInfo])

    return(
        <Row>
            <Col>
                <h2>Your Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <>
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{formatter(order.totalPrice)}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: 'red' }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: 'red' }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="secondary">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        {orders.length === 0 && (
                            <p>
                                You haven't placed any order yet,{' '}
                                <a href="https://freshbey.herokuapp.com/">Start Shopping!</a>
                            </p>
                        )}
                    </>
                )}
            </Col>
        </Row>
    )
}

export default OrdersScreen