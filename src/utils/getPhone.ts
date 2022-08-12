// eslint-disable-next-line import/no-anonymous-default-export
export default function (): string | null {
    return localStorage.getItem("username");
}