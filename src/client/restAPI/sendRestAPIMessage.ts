export default async function sendRestAPIMessage<RequestMessage = any, ResponseMessage = any>(url: string, message: RequestMessage): Promise<ResponseMessage> {
  return await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(response => response.json()) as ResponseMessage;
}
