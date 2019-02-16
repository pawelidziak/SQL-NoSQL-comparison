export class FileUtils {
  static saveMapToFile(data: any, filename: string): boolean {
    return FileUtils.saveToFile(FileUtils.mapToObj(data), filename);
  }

  static readFileToMap(event: any, callback: any): void {
    FileUtils.readFileFromInput(event, (result) => callback(FileUtils.objToMap(JSON.parse(result))));
  }

  static readFileFromInput(event: any, callback: any): void {
    const reader = new FileReader();

    if (!event.target.files || !event.target.files.length) {
      return;
    }

    const file = event.target.files[0];

    if (this.filesIncorrect(file)) {
      return;
    }

    reader.readAsText(file, 'ISO-8859-1');
    reader.onload = () => {
      callback(reader.result);
    };
  }

  static saveToFile(data: any, filename: string): boolean {
    filename = `${filename}.json`;
    const file = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob) {// IE10+
      return window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
      const a = document.createElement('a');
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
      return true;
    }
  }

  static mapToObj(aMap) {
    const obj = {};
    aMap.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }

  static objToMap(obj) {
    const mp = new Map();
    Object.keys(obj).forEach(k => {
      mp.set(k, obj[k]);
    });
    return mp;
  }

  private static filesIncorrect(file: File): boolean {
    return file.name.substr(file.name.length - '.json'.length) !== '.json';
  }
}
