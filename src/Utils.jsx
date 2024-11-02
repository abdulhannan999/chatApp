import { toast } from "react-toastify";

export const HandleError=(error)=>{
return toast.error(error, {
    position:"top-center"
})
}

export const HandleSuccess=(message)=>{
    return toast.success(message, {
        position:"top-center"
    })
    }