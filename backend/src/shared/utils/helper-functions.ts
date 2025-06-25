export default class HelperFunctions {
  static isObject = (value: null) => {
    return value !== null && typeof value === 'object';
  };
}
