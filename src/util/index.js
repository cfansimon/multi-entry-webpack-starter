import glob from 'glob';

const searchEntries = (entryPath, filterPattern = '/**/*.{js,jsx}', filenamePrefix = '') => {

  let files = {};

  entryPath = entryPath.replace(/\/$/, '');
  glob.sync(entryPath + filterPattern).forEach((file) => {
    const entryName = filenamePrefix + file.replace(entryPath + '/', '').replace(file.substring(file.lastIndexOf('.')), '');
    files[entryName] = file;
  });
  return files;
}

export { searchEntries };