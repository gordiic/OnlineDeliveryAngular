import jwt_decode from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function getTokenType() {
  return '';
}

export function getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
}

export function getUserTypeFromToken(token: string) {
  let claims = getDecodedAccessToken(token);
  console.log(claims);
  for (var c in claims) {
    var claim = c.split('/');
    if (claim[claim.length - 1] === 'role') {
      console.log(claims[c]);
      return claims[c];
    }
  }
}

export function getAccountStatusFromToken(token: string) {
  let claims = getDecodedAccessToken(token);
  console.log(claims);
  for (var c in claims) {
    var claim = c.split('/');
    if (claim[claim.length - 1] === 'authorizationdecision') {
      console.log(claims[c]);
      return claims[c];
    }
  }
}
