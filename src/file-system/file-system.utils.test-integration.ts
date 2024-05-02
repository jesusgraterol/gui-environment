import Utils from './file-system.utils.js';



const TEST_PATH = 'fs-test-dir';



describe('General Actions', () => {
  beforeAll(() => { });

  afterAll(() => { Utils.deleteDirectory(TEST_PATH); });

  beforeEach(() => { Utils.deleteDirectory(TEST_PATH); });

  afterEach(() => { });

  test('can determine if a path does not exist', () => {
    expect(Utils.pathExists(TEST_PATH)).toBeFalsy();
  });

  test('can determine if a path exists', () => {
    Utils.createDirectory(TEST_PATH);
    expect(Utils.pathExists(TEST_PATH)).toBeTruthy();
  });

  test('returns null when a path item does not exist', () => {
    expect(Utils.readPathItem(TEST_PATH)).toBeNull();
    expect(Utils.readPathItem(`${TEST_PATH}/test-file.txt`)).toBeNull();
  });

  test('can read a directory\'s item', () => {
    Utils.createDirectory(TEST_PATH);
    const item = Utils.readPathItem(TEST_PATH);
    expect(item).toBeTruthy();
    if (item) {
      expect(item.baseName).toBe(TEST_PATH);
      expect(item.path).toBe(TEST_PATH);
      expect(typeof item.creation).toBe('number');
      expect(item.extName).toBe('');
      expect(item.isDirectory).toBeTruthy();
      expect(item.isFile).toBeFalsy();
      expect(item.isSymbolicLink).toBeFalsy();
      expect(typeof item.size).toBe('number');
    }
  });

  test('can read a file\'s item', () => {
    Utils.createDirectory(TEST_PATH);
    Utils.writeTextFile(`${TEST_PATH}/test-file.txt`, 'Hello World!!');
    const item = Utils.readPathItem(`${TEST_PATH}/test-file.txt`);
    expect(item).toBeTruthy();
    if (item) {
      expect(item.baseName).toBe('test-file.txt');
      expect(item.path).toBe(`${TEST_PATH}/test-file.txt`);
      expect(typeof item.creation).toBe('number');
      expect(item.extName).toBe('.txt');
      expect(item.isDirectory).toBeFalsy();
      expect(item.isFile).toBeTruthy();
      expect(item.isSymbolicLink).toBeFalsy();
      expect(typeof item.size).toBe('number');
    }
  });
});





describe('Directory Actions', () => {
  beforeAll(() => { });

  afterAll(() => { Utils.deleteDirectory(TEST_PATH); });

  beforeEach(() => { Utils.deleteDirectory(TEST_PATH); });

  afterEach(() => { });

  test.todo('can determine if a path exists and is a directory (not a symbolic link)');

  test.todo('can determine if a path exists and is a directory (a symbolic link)');

  test('can create, read and delete a directory', () => {
    expect(Utils.pathExists(TEST_PATH)).toBeFalsy();
    Utils.createDirectory(TEST_PATH);
    expect(Utils.pathExists(TEST_PATH)).toBeTruthy();
    Utils.deleteDirectory(TEST_PATH);
    expect(Utils.pathExists(TEST_PATH)).toBeFalsy();
  });
});




describe('File Actions', () => {
  beforeAll(() => { });

  afterAll(() => { Utils.deleteDirectory(TEST_PATH); });

  beforeEach(() => { Utils.deleteDirectory(TEST_PATH); });

  afterEach(() => { });

  test.todo('can determine if a path exists and is a file (not a symbolic link)');

  test.todo('can determine if a path exists and is a file (a symbolic link)');

  test.todo('can write, read and delete a text file');
});
