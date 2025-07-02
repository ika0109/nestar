import { ObjectId } from 'bson';

export const availableAgentSort = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank'];
export const availableMemberSort = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];

export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank'];
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];

export const availableOptions = ['propertyBarter', 'propertyRent'];
export const availablePropertySorts = [
	'createdAt',
	'updatedAt',
	'propertyLikes',
	'propertyViews',
	'propertyRank',
	'propertyPrice',
];
// MOngoDb va Mongoiosega daxldor bolgan mantiqlar yzoilgan
export const availableBoardArticleSorts = ['createdAt', 'updatedAt', 'articleLikes', 'articleViews'];
export const availableCommentSorts = ['createdAt', 'updatedAt'];
//** IMAGE CONFIGURATION  */
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { T } from './types/common';

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
	return uuidv4() + ext;
};

export const shapeIntoMongooseObjectId = (target: any) => {
	return typeof target === 'string' ? new ObjectId(target) : target;
};
// *Bu funksiya siz biror itemga (masalan: post, article, user...) "like" bosganmisiz yo‘qmi — shuni aniqlaydi. Ya'ni, likes kolleksiyasidan mos tushadigan likeni qidiradi.
export const lookupAuthMemberLiked = (memberId: T, targetRefId: string = '$_id') => ({
	$lookup: {
		from: 'likes',
		let: {// search mexanizm uchun yordamga keladigan variable tashkil qildik
			localLikeRefId: targetRefId,
			localMemberId: memberId,
			localMyFavorite: true,
		},
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [
							{ $eq: [{ $toString: '$likeRefId' }, { $toString: '$$localLikeRefId' }] },//experession, equal solishtiryapmiz
							{ $eq: [{ $toString: '$memberId' }, { $toString: '$$localMemberId' }] },
						],
					},
				},
			},
			{
				$project: {// MeLiked shakllantiryapmiz ichidagi 3 ta narsani
					_id: 0,
					memberId: 1,
					likeRefId: 1,
					myFavorite: '$$localMyFavorite',
				},
			},
		],
		as: 'meLiked',
	},
});
interface LookupAuthMemberFollowed {
	followerId: T;
	followingId: string;
}

export const lookupAuthMemberFollowed = (input: LookupAuthMemberFollowed) => {
	const { followerId, followingId } = input;
	return {
		$lookup: {
			from: 'follows',
			let: {
				localFollowerId: followerId,
				localFollowingId: followingId,
				localMyFavorite: true,
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [
								{ $eq: [{ $toString: '$followerId' }, { $toString: '$$localFollowerId' }] },
								{ $eq: [{ $toString: '$followingId' }, { $toString: '$$localFollowingId' }] },
							],
						},
					},
				},
				{
					$project: {
						_id: 0,
						followerId: 1,
						followingId: 1,
						myFollowing: '$$localMyFavorite',
					},
				},
			],
			as: 'meFollowed',
		},
	};
};

export const lookupMember = {
	$lookup: {
		from: 'members',
		localField: 'memberId',
		foreignField: '_id',
		as: 'memberData',
	},
};
export const lookupFollowingData = {
	$lookup: {
		from: 'members',
		localField: 'followingId',
		foreignField: '_id',
		as: 'followingData',
	},
};

export const lookupFollowerData = {
	$lookup: {
		from: 'members',
		localField: 'followerId',
		foreignField: '_id',
		as: 'followerData',
	},
};
export const lookupFavorite = {
	$lookup: {
		from: 'members',
		localField: 'favoriteProperty.memberId',
		foreignField: '_id',
		as: 'favoriteProperty.memberData',
	},
};
export const lookupVisit = {
	$lookup: {
		from: 'members',
		localField: 'visitedProperty.memberId',
		foreignField: '_id',
		as: 'visitedProperty.memberData',
	},
};
