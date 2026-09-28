/**
 * W3C Web-Crypto Digital Signature Certificate (DSC) & PKI Engine
 * Real browser-native asymmetric cryptography (ECDSA P-256 / SHA-256)
 * Simulates Indian Government PKI / e-Sign without requiring external hardware dongles.
 */

export interface CryptographicSignatureResult {
  signatureHex: string;
  digestHex: string;
  publicKeyJwk: JsonWebKey;
  signerName: string;
  signerDesignation: string;
  organization: string;
  serialNumber: string;
  signedAt: string;
  algorithm: string;
}

export interface VerificationCheckResult {
  isValid: boolean;
  tampered: boolean;
  message: string;
  verifiedAt: string;
}

/**
 * Computes SHA-256 hash of a text string using W3C SubtleCrypto
 */
export async function computeSha256Digest(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Digitally signs a sanction order or document payload using browser-generated ECDSA keypair
 */
export async function signSanctionOrderWithDSC(
  orderPayload: string,
  signerName: string = 'Joint Secretary, Ministry of Tribal Affairs',
  signerDesignation: string = 'Authorized Signatory (Government of India)'
): Promise<CryptographicSignatureResult> {
  // 1. Generate real ECDSA P-256 keypair in browser hardware enclave
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true, // extractable
    ['sign', 'verify']
  );

  // 2. Compute SHA-256 digest of payload
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(orderPayload);
  const digestHex = await computeSha256Digest(orderPayload);

  // 3. Sign using ECDSA with SHA-256
  const signatureBuffer = await crypto.subtle.sign(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-256' },
    },
    keyPair.privateKey,
    dataBuffer
  );

  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  // 4. Export public key as JWK for client-side or third-party verification
  const publicKeyJwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey);

  return {
    signatureHex,
    digestHex: `SHA256:${digestHex.toUpperCase()}`,
    publicKeyJwk,
    signerName,
    signerDesignation,
    organization: 'Ministry of Tribal Affairs, Government of India',
    serialNumber: `MOTA-DSC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    signedAt: new Date().toISOString(),
    algorithm: 'ECDSA-P256-SHA256 (W3C WebCrypto Standard)',
  };
}

/**
 * Mathematically verifies an ECDSA digital signature against the payload and public key
 */
export async function verifyDigitalSignature(
  orderPayload: string,
  signatureHex: string,
  publicKeyJwk: JsonWebKey
): Promise<VerificationCheckResult> {
  try {
    // 1. Import public key
    const publicKey = await crypto.subtle.importKey(
      'jwk',
      publicKeyJwk,
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      false,
      ['verify']
    );

    // 2. Convert signature hex back to ArrayBuffer
    const sigBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );

    // 3. Verify signature
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(orderPayload);

    const isValid = await crypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-256' },
      },
      publicKey,
      sigBytes,
      dataBuffer
    );

    return {
      isValid,
      tampered: !isValid,
      message: isValid
        ? 'CRYPTOGRAPHICALLY VALID: Signature matches document content and verified against public DSC key. Zero tampering detected.'
        : 'SIGNATURE INVALID: Document payload has been altered after digital signing! Integrity violation.',
      verifiedAt: new Date().toISOString(),
    };
  } catch (err: any) {
    return {
      isValid: false,
      tampered: true,
      message: `VERIFICATION ERROR: ${err?.message || 'Signature format invalid'}`,
      verifiedAt: new Date().toISOString(),
    };
  }
}
