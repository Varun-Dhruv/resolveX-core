import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint, ComplaintDocument } from './schema/complaint.schema';
import { Model } from 'mongoose';
import { storeFile } from 'src/utils/store-file';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<ComplaintDocument>,
  ) {}
  createComplaint(complaint: any, user, files) {
    const filePaths = files.file.map((file) => {
      return storeFile(file);
    });
    if (user.role === 'USER') {
      complaint.user = user._id;
      const Complaint = new this.complaintModel({
        user: user._id,
        subject: complaint.subject,
        title: complaint.title,
        files: filePaths,
        details: complaint.details,
        type: complaint.type,
      });
      Complaint.save();
    }
    if (user.role === 'COMPANY') {
      complaint.company = user._id;
      const Complaint = new this.complaintModel({
        company: complaint.company,
        organization: complaint.organization,
        subject: complaint.subject,
        title: complaint.title,
        files: filePaths,
        details: complaint.details,
        type: complaint.type,
      });
      Complaint.save();
    }
    return { message: 'Complaint created successfully', complaint: Complaint };
  }

  async listComplaints() {
    return await this.complaintModel.find();
  }

  async listComplaintsByUser(user) {
    if (user.role === 'USER')
      return this.complaintModel.find({ user: user._id });
    if (user.role === 'COMPANY')
      return this.complaintModel.find({ company: user._id });
  }
}
