import mongoose,{Document, Model, Schema} from "mongoose";

interface CompanyAttrs {
    companyName: string;    
}

interface CompanyDoc extends Document {
    companyName: string;    
}

interface CompanyModel extends Model<CompanyDoc> {
    // build(attrs: CompanyAttrs): CompanyDoc;
}

const companySchema = new Schema<CompanyDoc>({
    companyName:{ type: String, required: true, unique: true}
});

// companySchema.statics.build = function (attrs: CompanyAttrs):CompanyDoc {
//     return new Company(attrs);} 

const Company = mongoose.model<CompanyDoc, CompanyModel>('Company', companySchema);

export { Company, CompanyAttrs, CompanyDoc};