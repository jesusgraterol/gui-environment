
/**
 * Path Item
 * ...
 */
interface IPathItem {
  path: string,
  baseName: string,
  extName: string,
  isFile: boolean,
  isDirectory: boolean,
  isSymbolicLink: boolean,
  size: number,
  creation: number,
}



/**
 * Module Exports
 */
export {
  // eslint-disable-next-line import/prefer-default-export
  IPathItem,
};
