import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_ASSETS_BUCKET } from '../common/constants';

export type AWSOperation = 'getObject' | 'putObject';
const s3 = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export class S3Service {
  uploadFile = async (file: Express.Multer.File) => {
    const { originalname } = file;
    return await this.s3_upload(file.buffer, AWS_ASSETS_BUCKET, originalname, file.mimetype);
  };

  uploadBuffer = async (file: Buffer, name: string, mimeType: string): Promise<void> => {
    await this.s3_upload(file, AWS_ASSETS_BUCKET, name, mimeType);
  };

  public async getSignedUrl(id: number, operation: AWSOperation) {
    const params = {
      Bucket: AWS_ASSETS_BUCKET,
      Key: String(id),
      Expires: 300,
      ACL: 'public-read',
    };
    return await s3.getSignedUrlPromise(operation, params);
  }

  public async deleteFile(id: number) {
    const params = {
      Bucket: AWS_ASSETS_BUCKET,
      Key: String(id),
    };
    return await s3.deleteObject(params).promise();
  }

  private async s3_upload(file: Buffer, bucket: string, name: string, mimetype: string): Promise<void> {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };
    await s3.upload(params).promise();
  }
}
