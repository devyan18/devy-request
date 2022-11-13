export interface fetchConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: {
    [key: string]: string;
  };
  body?: string | Object;
}

export async function request (
  protocol: 'http' | 'https',
  projectUrl: string,
  requestUrl: string,
  config: any | fetchConfig
) {
  try {
    const url = `${protocol}://${projectUrl}${requestUrl}`;
    return await fetch(url, config);
  } catch (error) {
    console.log(error);
    return error;
  }
}
