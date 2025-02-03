/**
 * 전화번호 문자열에서 하이픈(-)을 제거하여 포맷팅합니다.
 *
 * @param {string | null} phone - 포맷팅할 전화번호 문자열
 * @returns {string} 하이픈이 제거된 전화번호 또는 '전화번호 없음'
 *
 * @example
 * formatPhoneNumber('010-1234-5678') // returns '01012345678'
 * formatPhoneNumber(null) // returns '전화번호 없음'
 * formatPhoneNumber('02-123-4567') // returns '0212345678'
 */
export const formatPhoneNumber = (phone: string | null) => {
  if (!phone) return '전화번호 없음'
  return phone.replace(/-/g, '')
}
