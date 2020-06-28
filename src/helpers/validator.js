import handleError from "./handleError";

const validator = {
  text: (json) => {
    if (typeof json == "object") {
      for (let key in json) {
        if (json[key]) {
          console.log(key, ":", json[key]);
        } else {
          return false;
        }
      }
    } else {
      if (json) {
        console.log(json);
      } else {
        return false;
      }
    }

    return true;
  },
  select: (json) => {
    for (let key in json) {
      if (json[key]) {
        console.log(key, ":", json[key]);
      } else {
        return false;
      }
    }
    return true;
  },
  validarDatos: (json) => {
    let valido = true;
    for (let key in json) {
      if (typeof json[key] == "object") {
        let select = json[key];
        for (let key2 in select) {
          if (!select[key2]) {
            valido = false;
            handleError.select(key);
          }
        }
      } else {
        if (!json[key]) {
          valido = false;
          handleError.input(key);
        }
      }
    }
    return valido;
  },
  validarDatosEdit: (json) => {
    let valido = true;
    for (let key in json) {
      if (typeof json[key] == "object") {
        let select = json[key];
        for (let key2 in select) {
          if (!select[key2]) {
            valido = false;
            handleError.select(`${key}_edit`);
          }
        }
      } else {
        if (!json[key]) {
          valido = false;
          handleError.input(`${key}_edit`);
        }
      }
    }
    return valido;
  },
};

export default validator;
