import swal from "sweetalert2";

declare global {
    const Swal: typeof swal;
}

export default swal;
export as namespace swal;