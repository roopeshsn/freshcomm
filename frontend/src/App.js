import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CategoryScreen from './screens/CategoryScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import CreateProductScreen from './screens/CreateProductScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import SearchScreen from './screens/SearchScreen'
import CarouselListScreen from './screens/CarouselListScreen'
import CarouselEditScreen from './screens/CarouselEditScreen'
import CreateCarouselScreen from './screens/CreateCarouselScreen'
import { CategoryListScreen } from './screens/CategoryListScreen'
import Error404Screen from './screens/Error404Screen'
import Terms from './pages/Terms'
import Returns from './pages/Returns'
import Privacy from './pages/Privacy'
import Help from './pages/Help'
import SecurityScreen from "./screens/SecurityScreen";
import AddressesScreen from "./screens/AddressesScreen";
import OrdersScreen from "./screens/OrdersScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/search/:keyword" component={SearchScreen} />
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/login" component={LoginScreen}></Route>
            <Route path="/profile/orders" component={OrdersScreen} />
            <Route path="/profile/security" component={SecurityScreen} />
            <Route path="/profile/addresses" component={AddressesScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/register" component={RegisterScreen}></Route>
            <Route
              path="/forgotpassword/:email?"
              component={ForgotPasswordScreen}
            ></Route>
            <Route
              path="/resetpassword/:token"
              component={ResetPasswordScreen}
            ></Route>
            <Route path="/shipping" component={ShippingScreen}></Route>
            <Route path="/payment" component={PaymentScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/categories/:category" component={CategoryScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/admin/users" component={UsersListScreen} />
            <Route path="/admin/user/:id" component={UserEditScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} />
            <Route
              path="/admin/createproduct"
              component={CreateProductScreen}
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/admin/carousellist" component={CarouselListScreen} />
            <Route
              path="/admin/createcarousel"
              component={CreateCarouselScreen}
            />
            <Route
              path="/admin/carousel/:id/edit"
              component={CarouselEditScreen}
            />
            <Route path="/admin/categorylist" component={CategoryListScreen} />
            <Route path="/terms" component={Terms} />
            <Route path="/returns" component={Returns} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/help" component={Help} />
            <Route path="*" component={Error404Screen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
