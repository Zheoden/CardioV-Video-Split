import AWS from 'aws-sdk';
import 'dotenv/config';

export type AWSOperation = 'getObject' | 'putObject';
const s3 = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export class S3Service {
  private AWS_ASSETS_BUCKET = process.env.AWS_ASSETS_BUCKET ?? '';
  uploadFile = async (file: Express.Multer.File) => {
    const { originalname } = file;
    return await this.s3_upload(file.buffer, this.AWS_ASSETS_BUCKET, originalname, file.mimetype);
  };

  uploadBuffer = async (file: Buffer, name: string, mimeType: string) => {
    return await this.s3_upload(file, this.AWS_ASSETS_BUCKET, name, mimeType);
  };

  public async getSignedUrl(id: number, operation: AWSOperation) {
    const params = {
      Bucket: this.AWS_ASSETS_BUCKET,
      Key: String(id),
      Expires: 300,
      ACL: 'public-read',
    };
    return await s3.getSignedUrlPromise(operation, params);
  };

  public async deleteFile(id: number) {
    const params = {
      Bucket: this.AWS_ASSETS_BUCKET,
      Key: String(id),
    };
    return await s3.deleteObject(params).promise();
  };

  /**
   * [This is a private function and shouldn't be used]
   * @param  {[Buffer]} file [description]
   * @param  {[String]} bucket [description]
   * @param  {[String]} name [description]
   * @param  {[String]} mimetype [description]
   * @return {[]}      [description]
   */
  private async s3_upload(file: Buffer, bucket: string, name: string, mimetype: string) {
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
    return await s3.upload(params).promise();
  };
}
