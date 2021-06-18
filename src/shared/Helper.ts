export const setCookie = (name: string, value: string) => {
  const existCookieValue = checkExistCookie(name);
  if (!existCookieValue) {
    document.cookie = `${name}=${value}`;
  } else {
    const updatedValue = [...existCookieValue, ...JSON.parse(value)];
    document.cookie = `${name}=${JSON.stringify(updatedValue)}`;
  }
};

export const getCookies = (name: string) => {
  const cookies: any = document.cookie;
  return (
    cookies
      ?.split("; ")
      ?.find((row: any) => row.startsWith(`${name}=`))
      ?.split("=")[1] || null
  );
};

export const checkExistCookie = (name: string) => {
  const existCookie = getCookies(name);
  if (existCookie) {
    return JSON.parse(existCookie);
  } else {
    return false;
  }
};

export const resetCookieByName = (name: string) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
