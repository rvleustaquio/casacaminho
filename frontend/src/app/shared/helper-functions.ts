export default class HelperFunctions {
  static findIndexById(id: any, data: any[], column: string): number {
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i][column] === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
