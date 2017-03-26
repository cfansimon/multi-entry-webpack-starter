import glob from 'glob';
import fs from 'fs';

const searchEntries = (entryPath, filenamePrefix = '') => {

  let files = {};

  entryPath = entryPath.replace(/\/$/, '');
  glob.sync(entryPath + '/**/*.{js,jsx}').forEach((file) => {
    const entryName = filenamePrefix + file.replace(entryPath + '/', '').replace(file.substring(file.lastIndexOf('.')), '');
    files[entryName] = file;
  });
  return files;
}

const addDevLock = () => {
  let staticPath = 'web/static';
  fs.exists(staticPath, (exists) => {
    if(!exists) {
      fs.mkdir(staticPath, '0777');
    }
    fs.writeFile(staticPath + '/dev.lock', '');
  })
}

const removeDevLock = () => {
  let staticPath = 'web/static';
  fs.exists(staticPath + '/dev.lock', function(exists) {
    if (exists) {
      fs.unlink(staticPath + '/dev.lock');
    }
  });
}

const handleDevLock = (isDev) => {
  if (isDev) {
    addDevLock();
  } else {
    removeDevLock();
  }
}

export { searchEntries, handleDevLock};