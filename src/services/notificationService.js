//import { toast } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.min.css'

//toast.configure()

function alertInfo(msg) {
    //toast.info(msg)
    alert('Info: ' + msg)
}

function alertWarning(msg) {
    //toast.warn(msg)
    alert('Warning: ' + msg)
}

function alertSuccess(msg) {
    //toast.success(msg)
    alert('Success: ' + msg)
}

function alertDanger(msg) {
    //toast.error(msg)
    alert('Danger: ' + msg)
}

export default {
    alertInfo,
    alertWarning,
    alertSuccess,
    alertDanger
}