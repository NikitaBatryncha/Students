const createUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:3001/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Ошибка сохранения данных' + response.statusText);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }
};

export default createUser