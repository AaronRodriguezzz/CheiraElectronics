import Swal from 'sweetalert2';

const CustomAlert = (iconType, title) => {
    Swal.fire({
        title: title,
        icon: iconType,
        confirmButtonText: 'OK',
        draggable: false
    })
}

export default CustomAlert