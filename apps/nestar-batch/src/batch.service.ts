import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'apps/nestar-api/src/libs/dto/member/member';
import { Property } from 'apps/nestar-api/src/libs/dto/property/property';
import { MemberStatus, MemberType } from 'apps/nestar-api/src/libs/enums/member.enum';
import { PropertyStatus } from 'apps/nestar-api/src/libs/enums/property.enum';
import { Model } from 'mongoose';

@Injectable()
export class BatchService {
	constructor(// Bu joyda MongoDB model lar chaqirilyapti: Property va Member. Ular orqali ma’lumotlar o‘qiladi va yangilanadi.


		@InjectModel('Property') private readonly propertyModel: Model<Property>,
		@InjectModel('Member') private readonly memberModel: Model<Member>,
	) {}

	public async batchRollback(): Promise<void> {//Har kuni ertalab bu yerda agentlar va property'lar reytingi nolga tushiriladi. Bu – yangidan hisoblash uchun.
		await this.memberModel
			.updateMany(
				{
					memberStatus: MemberStatus.ACTIVE,
					memberType: MemberType.AGENT,
				},
				{
					memberRank: 0,
				},
			)
			.exec();

		await this.propertyModel
			.updateMany(
				{
					propertyStatus: PropertyStatus.ACTIVE,
				},
				{
					propertyRank: 0,
				},
			)
			.exec();
	}

	public async batchTopProperties(): Promise<void> {//Hozirgi aktiv property’lar olinadi (faqat ranki 0 bo‘lganlar).
		const properties: Property[] = await this.propertyModel
			.find({
				propertyStatus: PropertyStatus.ACTIVE,
				propertyRank: 0,
			})
			.exec();

		const promiseList = properties.map(async (ele: Property) => {
			const { _id, propertyLikes, propertyViews } = ele;
			const rank = propertyLikes * 2 + propertyViews * 1;

			return await this.propertyModel.findByIdAndUpdate(_id, {
				propertyRank: rank,
			});
		});

		await Promise.all(promiseList);//wap qilyapi promise bilan hammasni wrap qilyapmiz
	}//Har bir property uchun: rank = likes × 2 + views So‘ngra rank saqlanadi.

	public async batchTopAgents(): Promise<void> {//Faqat agentlar olinadi, hali ranki hisoblanmaganlar.
		const agents: Member[] = await this.memberModel
			.find({
				memberType: MemberType.AGENT,
				memberStatus: MemberStatus.ACTIVE,
				memberRank: 0,
			})
			.exec();
//Har bir agent uchun: rank = properties×5 + articles×3 + likes×2 + views×1 Keyin memberRank yangilanadi.
		const promiseList = agents.map(async (ele: Member) => {
			const { _id, memberProperties, memberArticles, memberLikes, memberViews } = ele;

			const rank = memberProperties * 5 + memberArticles * 3 + memberLikes * 2 + memberViews * 1;

			return await this.memberModel.findByIdAndUpdate(_id, {
				memberRank: rank,
			});
		});

		await Promise.all(promiseList);
	}

	public getHello(): string {
		return 'Welcome to Nestar BATCH Server!';
	}
}
