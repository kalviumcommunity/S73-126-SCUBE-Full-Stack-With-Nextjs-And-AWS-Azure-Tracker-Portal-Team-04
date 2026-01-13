import AWS from "aws-sdk";

const client = new AWS.SecretsManager({
  region: process.env.AWS_REGION,
});

export async function getSecrets() {
  const response = await client
    .getSecretValue({ SecretId: process.env.SECRET_ARN! })
    .promise();

  return JSON.parse(response.SecretString!);
}
