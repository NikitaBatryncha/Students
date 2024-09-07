const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/clients/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Ошибка удаления данных' + response.statusText);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }
};

export default deleteUser
