import {useSelector} from "react-redux";
import {useEffect} from "react";

const AddressesScreen = ({ location, history }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    })

    return(
        //TODO: Implement addresses
        <div>This is the addresses page</div>
    )
}

export default AddressesScreen