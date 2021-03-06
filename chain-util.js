const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const {v1:uuidv1} = require('uuid');
const ec = new EC('secp256k1');

class ChainUtil {

    /**
     * 
     * @returns a key pay object
     */
    static genKeyPair(){
        return ec.genKeyPair();
    }

    /**
     * 
     * @returns a UUID
     */
    static id(){
        return uuidv1();
    }

    /**
     * 
     * @param {*}  
     * @returns 
     */
    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }

    /**
     * 
     * @param {*} publicKey 
     * @param {*} signature 
     * @param {*} dataHash 
     * @returns 
     */
    static verifySignature(publicKey, signature, dataHash){
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}

module.exports = ChainUtil;