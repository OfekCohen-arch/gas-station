import { ShiftTable } from "../cmp/ShiftTable";
import { authService } from "../services/auth.service";

export function ShiftBoardPage(){
    const loggedInUser = authService.getLoggedInUser()
    return(
        <section>
        <h1>סידור עבודה</h1>
        <ShiftTable currWorker={loggedInUser}/>
        </section>
    )
}