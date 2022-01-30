const ChainUtil = require('../chain-util')
const { DIFFICULTY, MINE_RATE} = require('../config')

class Block {

    /**
     * @class An object representing a single Block to be added to a blockchain
     * @param {*} timestamp 
     * @param {*} lastHash 
     * @param {*} hash 
     * @param {*} data 
     * @param {*} nonce 
     * @param {*} difficulty 
     */
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data; 
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    /**
     * String representation of a Block object
     * @returns {String} 
     */
    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.substring(0,10)}
            Hash      : ${this.hash.substring(0,10)}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}
            Data      : ${this.data}
        `
    }

    /**
     * Creates the first Block in the blockchain
     * @returns {Block} the first block added to the blockchain
     */
    static genesis() {
        return new this('Genesis Time Stamp', '------', 'f1dsd-djs', '[]', 0, DIFFICULTY)
    }

    /** 
    * Add a block to the block chain using POW system inspired by HashCash
    * @param {Block} lastBlock - The block to add to the blockchain
    * @param {any} data - The data to be added to the block
    * @returns {Block} Then newly added block
    */
    static mineBlock(lastBlock, data){
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let {difficulty} = lastBlock;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while(hash.substring(0, difficulty) != '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty)
    }

    /**
     * 
     * @param {*} timestamp 
     * @param {*} lastHash 
     * @param {*} data 
     * @param {*} nonce 
     * @param {*} difficulty
     * @returns 
     */
    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    /**
     * 
     * @param {Block} block 
     * @returns 
     */
    static blockHash(block){
        const{timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    /**
     * Icrements or decrements the difficulty parameter depending on how quickly the
     * last block was mined
     * @param {Block} lastBlock 
     * @param {*} currentTime 
     * @returns {int} difficulty
     */
    static adjustDifficulty(lastBlock, currentTime){
        let {difficulty} = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;