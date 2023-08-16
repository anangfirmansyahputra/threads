import UserCard from '@/components/cards/UserCard';
import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadTab from '@/components/shared/ThreadTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communityTabs, profileTabs } from '@/constants';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser();

	if (!user) return null;

	const communityDetails = await fetchCommunityDetails(params.id);

	return (
		<section>
			<ProfileHeader
				accountId={communityDetails.id}
				authUserId={user.id}
				name={communityDetails.name}
				username={communityDetails.username}
				imageUrl={communityDetails.image}
				bio={communityDetails.bio}
				type='Community'
			/>

			<div className='mt-9'>
				<Tabs
					defaultValue='threads'
					className='w-full'
				>
					<TabsList className='tab'>
						{communityTabs.map((item) => (
							<TabsTrigger
								className='tab'
								key={item.label}
								value={item.value}
							>
								<Image
									src={item.icon}
									alt={item.label}
									width={24}
									height={24}
									className='object-contain'
								/>
								<p className='max-sm:hidden'>{item.label}</p>
								{item.label === 'Threads' && <p className='ml-1 rounded-sm bg-light-4 px-2 py1 !text-tiny-medium text-light-2'>{communityDetails?.threads?.length}</p>}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent
						value={'threads'}
						className='w-full text-light-1'
					>
						<ThreadTab
							currentUserId={user.id}
							accountId={communityDetails._id}
							accountType='Community'
						/>
					</TabsContent>
					<TabsContent
						value={'members'}
						className='w-full text-light-1'
					>
						<section className='mt-9 flex flex-col gap-10'>
							{communityDetails?.members.map((member: any) => (
								<UserCard
									key={member.id}
									id={member.id}
									name={member.name}
									username={member.username}
									imageUrl={member.image}
									personType='User'
								/>
							))}
						</section>
					</TabsContent>
					<TabsContent
						value={'requests'}
						className='w-full text-light-1'
					>
						<ThreadTab
							currentUserId={user.id}
							accountId={communityDetails._id}
							accountType='Community'
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default Page;
