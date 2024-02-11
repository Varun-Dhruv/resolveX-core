import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint, ComplaintDocument } from './schema/complaint.schema';
import { Model } from 'mongoose';
import { storeFile } from 'src/utils/store-file';
import { PostsService } from 'src/posts/posts.service';
import { User, UserDocument } from 'src/user/schema/user.schema';
import {
  Organization,
  OrganizationDocument,
} from 'src/organization/organization.schema';
import { contains } from 'class-validator';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<ComplaintDocument>,
    @Inject(PostsService)
    private readonly postService: PostsService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}
  async createComplaint(complaint: any, user, files) {
    let filePaths = [];
    if (files?.file) {
      filePaths = files.file.map((file) => {
        return storeFile(file);
      });
    } else {
      filePaths = [];
    }
    // name contains the name of the organization
    const organization = await this.organizationModel.findOne({
      name: 'Brihanmumbai Municipal Corporation',
    });
    if (user.role === 'USER') {
      complaint.user = user._id;
      const Complaint = new this.complaintModel({
        source: 'APP',
        organization: organization._id,
        user: user._id,
        subject: complaint.subject,
        title: complaint.title,
        files: filePaths,
        details: complaint.details,
        type: complaint.type ? complaint.type : 'private',
      });
      Complaint.save();
    }
    if (user.role === 'COMPANY') {
      console.log('company');
      complaint.company = user._id;
      const Complaint = new this.complaintModel({
        company: complaint.company,
        organization: organization._id,
        subject: complaint.subject,
        title: complaint.title,
        files: filePaths,
        details: complaint.details,
        type: complaint.type ? complaint.type : 'private',
      });
      Complaint.save();
    }
    return { message: 'Complaint created successfully', complaint: Complaint };
  }

  async listComplaints() {
    return await this.complaintModel.find().populate('user');
  }

  async updateComplaintStatus(complaintId, status) {
    const complaint = await this.complaintModel.findById(complaintId);
    if (!complaint) throw new NotFoundException('Complaint not found');
    const statusEnum = [
      'LODGED',
      'LOOKING_INTO',
      'REVIEWING',
      'ACTION',
      'FORWARDED',
      'RESOLVED',
      'INCOMPLETE',
      'REJECTED',
    ];
    if (statusEnum.indexOf(status) === -1)
      throw new BadRequestException('Invalid status');
    if (statusEnum.indexOf(status) < statusEnum.indexOf(complaint.status))
      throw new BadRequestException('Please select a valid status');

    if (status === 'INCOMPLETE' && complaint.user) {
      const user = await this.userModel.findById(complaint.user);
      await this.postService.createPost({
        user: user._id,
        type: 'COMPLAINTS',
        complaint: complaintId,
        remarks: 'Complaint is incomplete',
      });
    }
    return await this.complaintModel.findByIdAndUpdate(
      complaintId,
      { status: status },
      { new: true },
    );
  }

  async listComplaintsByUser(user) {
    if (user.role === 'USER')
      return this.complaintModel.find({ user: user._id }).populate('user');
    if (user.role === 'COMPANY')
      return this.complaintModel.find({ company: user._id }).populate('user');
  }
}
