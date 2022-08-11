export default function getId(): string | null {
    return localStorage.getItem("id");
}