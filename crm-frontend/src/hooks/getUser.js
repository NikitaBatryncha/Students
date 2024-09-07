const getUser = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/clients`);

    if (!response.ok) {
      throw new Error('Ошибка сохранения данных' + response.statusText);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }
};

export default getUser
