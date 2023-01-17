import { initializeApp } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

import Compress from "compress.js";

export default class Firebase {
  constructor() {
    this._config = {
      apiKey: "AIzaSyBDz8DAGTASyHg0EdHRptTdElkNz_S_JzE",
      authDomain: "intranet-sespa.firebaseapp.com",
      projectId: "intranet-sespa",
      storageBucket: "intranet-sespa.appspot.com",
      messagingSenderId: "884695960133",
      appId: "1:884695960133:web:219967bcf8f8d20d52712c",
      measurementId: "G-T8CS8146Z3",
    };

    this.init();
    this.compress = new Compress();
  }

  init() {
    if (!window._initializedFirebase) {
      this.firebase = initializeApp(this._config);
      window._initializedFirebase = true;
    }
  }

  static hd() {
    return getStorage();
  }

  onSelect(obj) {
    return new Promise((resolve, reject) => {
      //Capturando objeto
      let arquivo = {
        base64: "",
        type: null,
      };
      let file = obj.files[0];
      let fileReader = new FileReader();
      //Capiturando Base64 do objeto
      fileReader.onload = () => {
        arquivo.base64 = fileReader.result;
      };
      fileReader.readAsDataURL(file);

      //APLICANDO O COMPRESS
      if (file.type.startsWith("image/")) {
        this.compress
          .compress([file], {
            size: 2,
            quality: 0.75,
            maxWidth: 1920,
            maxHeight: 1920,
            resize: true,
          })
          .then((data) => {
            let arquivoComprimido = data[0];
            arquivo.base64 = `${arquivoComprimido.prefix}${arquivoComprimido.data}`;
            resolve(arquivo);
          })
          .catch((error) => {
            console.error("Error " + error);
            reject("Não foi possível ler o arquivo!");
          });
      } else {
        resolve(arquivo);
      }
    });
  }

  onUpload(file, from) {
    return new Promise((resolve, reject) => {
      const storeRef = ref(Firebase.hd(), from);

      uploadString(storeRef, file.base64, "data_url")
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  onUpdate(file, from, url) {
    return new Promise((resolve, reject) => {
      this.onDeleteByURL(url)
        .then(() => {
          this.onUpload(file, from)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((err) => {
              console.error(err);
              reject("Não foi possível atualizar a imagem");
            });
        })
        .catch((err) => {
          console.error(err);
          reject("Não foi possível excluir a imagem");
        });
    });
  }

  onDelete(from) {
    return new Promise((resolve, reject) => {
      deleteObject(ref(Firebase.hd(), from))
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.err(err);
          reject("Não foi possível deletar a imagem");
        });
    });
  }

  onDeleteByURL(url) {
    return new Promise((resolve, reject) => {
      deleteObject(ref(Firebase.hd(), url))
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.err(err);
          reject("Não foi possível deletar a imagem");
        });
    });
  }
}
