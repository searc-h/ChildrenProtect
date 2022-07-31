export default function Set (){
    return <>
        <form>
            <label>
                管理员账户名
                <input placeholder={"15086861111"}/>    {/*原账户名*/}
                <button type={"button"}>修改账户名</button>
            </label>
            <label>
                管理员账户密码
                <input type={"password"} placeholder={"*******"}/>    {/*原*/}
                <button type={"button"}>修改密码</button>
            </label>
        </form>
    </>
}