const globalModel = {};
import CryptoJS from "crypto-js";

globalModel.encrptPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            const encrypted = CryptoJS.AES.encrypt(password, process.env.ENCRYPTION_KEY).toString();
            resolve(encrypted);
        } catch (err) {
            reject(err);
            console.log("=> globalModel.encrptPassword :", error.toString());
        }
    });
};

globalModel.decryptPassword = (password,hash) => {
    return new Promise((resolve, reject) => {
        try {
            const bytes = CryptoJS.AES.decrypt(hash, process.env.ENCRYPTION_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if (decrypted === password) resolve(true);
            else resolve(false);
        } catch (err) {
            resolve(false);
        }
    });
};

export default globalModel;
