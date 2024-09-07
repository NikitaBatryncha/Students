export default function sortClients (array, key, dir) {
  return array.sort((a, b) => {
    let dirIf = a[key] < b[key];
    if (dir == true) dirIf = a[key] > b[key];
    if (dirIf == true) return -1;
  })
}
