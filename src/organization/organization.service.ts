import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organization, OrganizationDocument } from './organization.schema';
import { Model } from 'mongoose';
import { storeFile } from 'src/utils/store-file';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

  async createOrganization(body: any, file: any) {
    try {
      const organization = await this.organizationModel.findOne({
        email: body.email,
      });
      if (organization) {
        return {
          organization,
          created: false,
        };
      } else {
        const imagePath = storeFile(file);

        const newOrganization = await new this.organizationModel({
          name: body.name,
          email: body.email,
          image: imagePath,
        }).save();

        return {
          created: true,
          organization: newOrganization,
        };
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getOrganizations() {
    try {
      const organizations = await this.organizationModel.find();
      return organizations;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
