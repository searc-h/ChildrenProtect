import {useState} from "react";
import {Button, Form, Input, message, Modal} from "antd";
import './Set.css'
import getId from "../../utils/getId";
import {modifyPhone, modifyPwd, verificationCode} from "../../api/setApi";
import getPhone from "../../utils/getPhone";

export default function Set (){
    const [visible, setVisible] = useState<boolean[]>(new Array(2).fill(false));
    const [form1] = Form.useForm(), // 修改账户表单
        [form2] = Form.useForm();   // 修改密码表单

    function showModal(order: 0 | 1) {
        setVisible(arr => {
            const res = [...arr]
            res[order] = true;
            return res;
        })
    }
    // 获取验证码
    const getCode = (phone: string) => {
        const id = getId();
        if (!id) return message.error("缺少Id字段");
        verificationCode(id, phone).then(res => {
            return message.success(res.data.message);
        }, err => {
            return message.error(err.response.data.message);
        })
    }
    function handleForm(flag: boolean) {    // true表单1，false表单2
        const id = getId();
        if (!id) return message.error("缺少Id字段");
        flag
            ? form1
                .validateFields()
                .then(val => {
                    if (!val.code) return message.warn("请填写验证码");
                    modifyPhone(id, val.newPhone, val.code)
                        .then(res => {
                            return message.success(res.data.message);
                        }, err => {
                            return message.error(err.response.data.message);
                        })
                    form1.resetFields();
                }, info => {
                    return message.error("Validate Failed: ", info);
                })
            : form2
                .validateFields()
                .then(val => {
                    const {oldPassword, newPassword} = val;
                    if (!oldPassword || !newPassword) return message.error("请填写完整");
                    modifyPwd(id, oldPassword, newPassword).then(res => {
                        return message.success(res.data.message);
                    }, err => {
                        return message.error(err.response.data.message);
                    })
                    form1.resetFields();
                }, info => {
                    return message.error("Validate Failed: ", info);
                })
        setVisible([false, false]);
    }

    return <>
        <form className="form-outer">
            <label>
                <div className="title">管理员账户名</div>
                <input type="text" placeholder={getPhone() || "显示错误"}/>    {/*原账户名*/}
                <button type={"button"} onClick={() => showModal(0)}>修改账户名</button>
            </label>
            <label>
                <div className="title">管理员账户密码</div>
                <input type={"password"} placeholder={"*******"}/>    {/*原*/}
                <button type={"button"} onClick={() => showModal(1)}>修改密码</button>
            </label>
        </form>

        <Modal centered title={"修改账号"} visible={visible[0]}
               onOk={() => handleForm(true)} okText="提交"
               onCancel={() => setVisible([false, false])}
               cancelText="取消">
            <Form
                form={form1}
            >
                <Form.Item
                    name={"newPhone"}
                    label={"账号"}
                    required
                >
                    <Input placeholder={"请输入新手机号"} />
                </Form.Item>
                <Form.Item
                    name={"code"}
                    label={"验证码"}
                    required
                >
                    <Input placeholder={"请输入验证码"} style={{width: 250}} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType={"button"} type={"primary"} onClick={() => getCode(form1.getFieldValue("newPhone"))}>
                        获取验证码
                    </Button>
                </Form.Item>
            </Form>
        </Modal>

        <Modal centered title={"修改密码"} visible={visible[1]}
               onOk={() => handleForm(false)} okText="提交"
               onCancel={() => setVisible([false, false])}
               cancelText="取消">
            <Form form={form2}>
                <Form.Item name={"oldPassword"} label={"原密码"} required>
                    <Input.Password placeholder={"请输入"} />
                </Form.Item>
                <Form.Item name={"newPassword"} label={"新密码"} required>
                    <Input.Password placeholder={"请输入"} />
                </Form.Item>
                <Form.Item name={"confirm"} label={"确认新密码"} required
                    rules={[
                        {required: true},
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newPassword") === value)
                                    return Promise.resolve();
                                return Promise.reject(new Error("两次输入密码不匹配"));
                            }
                        }),
                    ]}
                >
                    <Input.Password placeholder={"请输入"} />
                </Form.Item>
            </Form>
        </Modal>
    </>
}