// 设置账户名/电话
// eslint-disable-next-line import/no-anonymous-default-export
export default function (username: string): void {
    localStorage.setItem("username", username);
}