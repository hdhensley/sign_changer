import path = require('path');
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { AllowedMethods, Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';

export class InfrastructureStack extends cdk.Stack {
  private static readonly BUCKET_NAME = 'com.overzealouspelican.sign-changer';
  private static readonly DOMAIN_NAME = 'sign-changer.overzealouspelican.com';

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'OriginAccessBucket', {
      bucketName: InfrastructureStack.BUCKET_NAME,
      accessControl: BucketAccessControl.PRIVATE,
      publicReadAccess: false
    });

    new BucketDeployment(this, 'BucketDeployment', {
      destinationBucket: bucket,
      sources: [
        Source.asset(path.resolve(__dirname, '../../dist')),
      ]
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: 'CloudFront Origin Access Identity for SignChanger Website',
    });
    bucket.grantRead(originAccessIdentity);

    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: InfrastructureStack.DOMAIN_NAME,
      validation: acm.CertificateValidation.fromDns()
    });

    const distribution = new Distribution(this, 'Distribution', {
      certificate,
      domainNames: [InfrastructureStack.DOMAIN_NAME,],
      defaultRootObject: 'index.html',
      defaultBehavior: {
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        origin: S3BucketOrigin.withOriginAccessIdentity(bucket, {
          originAccessIdentity,
          originId: 'SignChangerWebsiteOrigin',
        })
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        }
      ]
    });

    new cdk.CfnOutput(this, 'BucketNameOutput', {
      value: bucket.bucketName,
      description: 'The name of the S3 bucket',
      exportName: 'BucketName'
    });

    new cdk.CfnOutput(this, 'DistributionIdOutput', {
      value: distribution.distributionId,
      description: 'The ID of the CloudFront distribution',
      exportName: 'DistributionId'
    });

    new cdk.CfnOutput(this, 'CertificateArnOutput', {
      value: certificate.certificateArn,
      description: 'The ARN of the ACM certificate',
      exportName: 'CertificateArn'
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'The domain name of the CloudFront distribution',
      exportName: 'DistributionDomainName'
    });
  }
}
