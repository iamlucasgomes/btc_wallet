// Criação de uma carteira Bitcoin HD (Hierarchical Deterministic) usando bip32 e bip39
// Esta carteira é compatível com o padrão BIP-49 (P2SH-P2WPKH) para a rede de testes do Bitcoin (Testnet)
'use strict';

import bip32 from 'bip32';
import bip39 from 'bip39';
import bitcoin from 'bitcoinjs-lib';

// Configuração da rede para Testnet
// A rede Testnet é usada para desenvolvimento e testes, permitindo que os desenvolvedores criem e testem aplicativos sem risco financeiro.
const network = bitcoin.networks.testnet;

//derivação de carteiras HD
const path = "m/49'/1'/0'/0";

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//criando a raiz da carteira HD
const root = bip32.fromSeed(seed, network);

//criando uma conta - par pvt-sub keys
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2wpkh({
  pubkey: node.publicKey,
  network: network,
}).address;


console.log('Carteira criada com sucesso!');
console.log('Endereço BTC:', btcAddress);
console.log('Chave privada:', node.toWIF());
console.log('Seed:', mnemonic);