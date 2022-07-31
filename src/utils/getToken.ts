
type token = string
/**
 * @method 从session中获取token
 */
export default function getToken() :token {
  return sessionStorage.getItem('token') || ''
}
