/**
 * Utils
 */
interface IFileSystemUtils {
  // general actions
  pathExists(path: string): boolean,
  readPathItem(path: string): IPathItem | null,

  // directory actions
  isDirectory(path: string, allowSymbolicLink: boolean): boolean,
  createDirectory(path: string): void,
  deleteDirectory(path: string): void,

  // file actions
  writeTextFile(path: string, data: string): void,

}


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
  IFileSystemUtils,
  IPathItem,
};
