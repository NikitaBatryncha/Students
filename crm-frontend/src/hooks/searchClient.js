export default function searchClient(array, string) {
  return array.filter((client) =>
    client.data.toLowerCase().includes(string.trim().toLowerCase())
  );
}
