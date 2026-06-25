export const submitCalltouch = async (data: {
  fio: string;
  phoneNumber: string;
  subject: string;
}) => {
  try {
    // Получаем sessionId из объекта window.ct, если он есть
    let sessionId = '';
    if (typeof window !== 'undefined' && (window as any).ct) {
      try {
        sessionId = (window as any).ct('calltracking_params', '6hckni4z')?.sessionId || '';
      } catch (e) {
        console.warn('Calltouch session id not found');
      }
    } else if (typeof window !== 'undefined' && (window as any).call_value) {
      sessionId = (window as any).call_value;
    }

    const response = await fetch('/api/calltouch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        sessionId,
      }),
    });
    
    if (!response.ok) {
      console.error('Calltouch submission failed', await response.text());
    }
  } catch (error) {
    console.error('Calltouch submission error', error);
  }
};
