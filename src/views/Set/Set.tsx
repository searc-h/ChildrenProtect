import {useState} from "react";
import {Button, Input, Modal} from "antd";

interface ModalContent {
    title: string,
    visible: boolean,
}

export default function Set (){
    const [visible, setVisible] = useState<boolean[]>(new Array(2).fill(false));

    function showModal(order: 0 | 1) {
        setVisible(arr => {
            const res = [...arr]
            res[order] = true;
            return res;
        })
    }
    function handleForm() {
        setVisible([false, false]);
    }

    return <>
        <form>
            <label>
                管理员账户名
                <input placeholder={"15086861111"}/>    {/*原账户名*/}
                <button type={"button"} onClick={() => showModal(0)}>修改账户名</button>
            </label>
            <label>
                管理员账户密码
                <input type={"password"} placeholder={"*******"}/>    {/*原*/}
                <button type={"button"} onClick={() => showModal(1)}>修改密码</button>
            </label>
        </form>
        <Modal title={"修改账号"} visible={visible[0]} onOk={handleForm} onCancel={handleForm}>
            <label>
                账号
                <Input placeholder={"请输入新手机号"} />
            </label>
            <label>
                验证码
                <Input placeholder={"请输入验证码"} />
                <Button title={"获取验证码"} />
            </label>
        </Modal>
        <Modal title={"修改密码"} visible={visible[1]} onOk={handleForm} onCancel={handleForm}>
            <label>
                原密码
                <Input placeholder={"请输入"} />
            </label>
            <label>
                新密码
                <Input placeholder={"请输入"} />
            </label>
            <label>
                确认新密码
                <Input placeholder={"请输入"} />
            </label>
        </Modal>
    </>
}