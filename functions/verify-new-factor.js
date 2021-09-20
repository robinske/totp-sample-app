/**
 *  Returns JSON:
 *  {
 *    "ok": boolean,
 *    "message": string,
 *    "backupCodes": array[string] // not present if ok is false
 *  }
 */
const assets = Runtime.getAssets();
const { detectMissingParams, VerificationException } = require(assets[
  "/utils.js"
].path);

async function generateBackupCodes() {
  // PLACEHOLDER DO NOT USE IN PRODUCTION
  const backupCodes = [
    "6163346800",
    "7479147371",
    "5763599513",
    "8649766853",
    "7318661590",
    "7695509658",
    "3491963491",
    "6257351652",
    "9886113044",
    "1688079534",
  ];

  return Promise.resolve(backupCodes);
}

async function verifyFactor(entity, factorSid, code) {
  const factor = await entity.factors(factorSid).update({ authPayload: code });

  if (factor.status === "verified") {
    return "Factor verified.";
    // eslint-disable-next-line no-else-return
  } else {
    throw new VerificationException(
      401,
      `Incorrect token. Check your authenticator app (or wait for the token to refresh) and try again.`
    );
  }
}

exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader("Content-Type", "application/json");

  /*
   * uncomment to support CORS
   * response.appendHeader('Access-Control-Allow-Origin', '*');
   * response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
   * response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
   */

  try {
    const missingParams = detectMissingParams(
      ["identity", "code", "factorSid"],
      event
    );
    if (missingParams.length > 0) {
      throw new VerificationException(
        400,
        `Missing parameter; please provide: '${missingParams.join(", ")}'.`
      );
    }

    const client = context.getTwilioClient();
    const service = context.VERIFY_SERVICE_SID;
    const { identity, factorSid, code } = event;

    const entity = client.verify.services(service).entities(identity);
    const message = await verifyFactor(entity, factorSid, code);
    const backupCodes = await generateBackupCodes(entity);

    response.setStatusCode(200);
    response.setBody({
      ok: true,
      backupFactorSid: "YFxxxxx", // placeholder
      backupCodes,
      message,
    });
    return callback(null, response);
  } catch (error) {
    response.setStatusCode(error.status);
    response.setBody({
      ok: false,
      message: error.message,
    });
    return callback(null, response);
  }
};
