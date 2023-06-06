import * as openpgp from "openpgp";

export const encrypt = async (
  file: File,
  keys: { public: any; private: any; passphrase: string }
) => {
  // put keys in backtick (``) to avoid errors caused by spaces or tabs
  const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
...
-----END PGP PUBLIC KEY BLOCK-----`;
  const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----
...
-----END PGP PRIVATE KEY BLOCK-----`; // encrypted private key
  const passphrase = `yourPassphrase`; // what the private key is encrypted with

  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase,
  });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({
      binary: file.stream(),
    }), // input as Message object
    encryptionKeys: publicKey,
    signingKeys: privateKey, // optional
  });
  console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

  const message = await openpgp.readMessage({
    armoredMessage: encrypted, // parse armored message
  });

  const { data: decrypted, signatures } = await openpgp.decrypt({
    message,
    verificationKeys: publicKey, // optional
    decryptionKeys: privateKey,
  });
  console.log(decrypted); // 'Hello, World!'
  // check signature validity (signed messages only)

  try {
    await signatures[0].verified; // throws on invalid signature
    return {
      message: decrypted,
      encrypted,
    };
  } catch (e) {
    throw new Error("Signature could not be verified: " + e.message);
  }
};
